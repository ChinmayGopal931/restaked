require("dotenv").config();
const { weiToEth } = require("../utils/utils");
const { Web3 } = require("web3");
const web3 = new Web3(process.env.RPC_URL);
const { delegationManager } = require("../services/contracts");

async function checkEventsAtBlock(
  contract = delegationManager,
  eventName = "OperatorSharesIncreased"
) {
  console.log(";ere", eventName);
  let fromBlock = 19691387;
  const toBlock = 19691387;
  const batchSize = 5000;

  console.log("Starting fetch from:", fromBlock, "to:", toBlock);

  let eventData = [];
  while (fromBlock <= toBlock) {
    const endBlock = Math.min(fromBlock + batchSize - 1, toBlock);
    try {
      let options = { fromBlock, toBlock: endBlock };
      console.log(
        `Fetching events for ${eventName} from block ${fromBlock} to ${endBlock}`
      );
      const events = await contract.getPastEvents(eventName, options);
      const blockCache = {};

      for (const event of events) {
        // if (!blockCache[event.blockNumber]) {
        //   blockCache[event.blockNumber] = await web3.eth.getBlock(
        //     event.blockNumber
        //   );
        // }
        // const block = blockCache[event.blockNumber];

        console.log(event);
        if (
          [
            "OperatorAVSRegistrationStatusUpdated",
            // "OperatorSharesDecreased",
            // "OperatorMetadataURIUpdated",
          ].includes(event.event)
        ) {
          if (event.event === "OperatorAVSRegistrationStatusUpdated") {
            console.log(event.event);
            return;
          }
          let dataPoint = {
            event: event.event,
            operator: event.returnValues.operator,
            block: Number(block.number),
            timestamp: Number(block.timestamp),
          };

          if (
            event.event === "OperatorSharesIncreased" ||
            event.event === "OperatorSharesDecreased"
          ) {
            const sharesInEth = weiToEth(event.returnValues.shares);
            dataPoint.shares = sharesInEth;
            dataPoint.staker = event.returnValues.staker;
            dataPoint.strategy = event.returnValues.strategy;
          } else if (event.event === "OperatorMetadataURIUpdated") {
            dataPoint.metadataURI = event.returnValues.metadataURI;
          }

          eventData.push(dataPoint);
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

checkEventsAtBlock()
  .then(() => {
    console.log("Finished checking events.");
  })
  .catch((err) => {
    console.error("Error checking events:", err);
  });

module.exports = { checkEventsAtBlock };
