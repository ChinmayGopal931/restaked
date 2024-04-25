require("dotenv").config();
const { Web3 } = require("web3");
const { avsManager } = require("../services/contracts");
const { saveAVSData } = require("../scripts/mongoose/saveAVSData");
const connectDB = require("../db/db");

//@DEV TODO: NEED A WAY TO PULL THIS AUTOMATICALLY
let avsDataMap = {
  "0x870679e138bcdf293b7ff14dd44b70fc97e12fc0": [],
  "0x71a77037870169d47aad6c2c9360861a4c0df2bf": [],
  "0xd25c2c5802198cb8541987b73a8db4c9bcae5cc7": [],
  "0x23221c5bb90c7c57ecc1e75513e2e4257673f0ef": [],
  "0x6026b61bdd2252160691cb3f6005b6b72e0ec044": [],
  "0x35f4f28a8d3ff20eed10e087e8f96ea2641e6aa2": [],
  "0xed2f4d90b073128ae6769a9a8d51547b1df766c8": [],
  "0x9fc952bdcbb7daca7d420fa55b942405b073a89d": [],
};

async function parseAVSData(contract, eventName) {
  let fromBlock = 19713365;
  const web3 = new Web3(process.env.RPC_URL);
  const toBlock = Number(await web3.eth.getBlockNumber());
  const batchSize = 5000;

  while (fromBlock <= toBlock) {
    const endBlock = Math.min(fromBlock + batchSize - 1, toBlock);
    try {
      let options = { fromBlock, toBlock: endBlock };
      console.log(
        `Fetching events for ${eventName} from block ${fromBlock} to ${endBlock}`
      );
      const events = await contract.getPastEvents(eventName, options);

      for (const event of events) {
        if (event.returnValues.status == 1) {
          addOperatorToAvs(event.returnValues.avs, event.returnValues.operator);
        } else if (event.returnValues.status == 0) {
          removeOperatorFromAvs(
            event.returnValues.avs,
            event.returnValues.operator
          );
        }
      }
    } catch (error) {
      console.error(
        `Error fetching '${eventName}' events from block ${fromBlock} to ${endBlock}:`,
        error
      );
    }
    fromBlock = endBlock + 1;
  }
}

parseAVSData(avsManager, "OperatorAVSRegistrationStatusUpdated")
  .then(() => {
    console.log("Finished checking events.");
    connectDB()
      .then(() => {
        saveAVSData(avsDataMap);
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
      });
  })
  .catch((err) => {
    console.error("Error checking events:", err);
  });

module.exports = { parseAVSData };

/**
 * Adds an operator to the specified AVS entry. If the AVS entry does not exist,
 * it creates a new entry.
 * @param {string} avs - The AVS identifier.
 * @param {string} operator - The operator to add.
 */
function addOperatorToAvs(avs, operator) {
  if (!avsDataMap[avs]) {
    avsDataMap[avs] = []; // Initialize empty array if avs doesn't exist
  }
  avsDataMap[avs].push(operator);
}

/**
 * Removes an operator from the specified AVS entry.
 * @param {string} avs - The AVS identifier.
 * @param {string} operator - The operator to remove.
 */
function removeOperatorFromAvs(avs, operator) {
  if (avsDataMap[avs]) {
    avsDataMap[avs] = avsDataMap[avs].filter((op) => op !== operator);
  }
}
