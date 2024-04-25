require("dotenv").config();
const { delegationManager } = require("../services/contracts");
const {
  saveAvgStakerData,
} = require("../scripts/mongoose/saveAverageStakerTimeData");
const connectDB = require("../db/db");

const { Web3 } = require("web3");

const web3 = new Web3(process.env.RPC_URL);
const operatorStakerMap = new Map();
const operatorTimeMap = new Map();
const operatorAvgStakingTimeMap = new Map();

async function processEvents(events, isDelegated = true) {
  const blockPromises = events.map((event) =>
    web3.eth.getBlock(event.blockNumber).then((block) => ({ block, event }))
  );

  const results = await Promise.all(blockPromises);

  for (const { block, event } of results) {
    try {
      const key = event.returnValues.operator + "-" + event.returnValues.staker;
      if (isDelegated) {
        // For delegated events, store the timestamp when delegation starts
        operatorStakerMap.set(key, block.timestamp);
      } else {
        // For undelegated events, calculate the time and remove the entry
        const startTime = operatorStakerMap.get(key);
        operatorStakerMap.delete(key); //Remove from map after processing

        if (!startTime) continue; // This is only due to failures in INFURA to give us all the data

        const timeDuration = block.timestamp - startTime;
        const operator = event.returnValues.operator;
        if (operatorTimeMap.has(operator)) {
          operatorTimeMap.get(operator).push(timeDuration);
        } else {
          operatorTimeMap.set(operator, [timeDuration]);
        }
      }
    } catch (e) {
      console.log("Error Parsing data: ", e);
    }
  }
}

async function checkEventsAtBlock(contract) {
  let fromBlock = 19713365;
  const toBlock = Number(await web3.eth.getBlockNumber());
  const batchSize = 500;

  console.log("Starting fetch from:", fromBlock, "to:", toBlock);

  while (fromBlock <= toBlock) {
    const endBlock = Math.min(fromBlock + batchSize - 1, toBlock);
    try {
      let options = { fromBlock, toBlock: endBlock };

      const delegatedEvents = await contract.getPastEvents(
        "StakerDelegated",
        options
      );
      console.log("Processing", delegatedEvents.length, "delegated events");
      await processEvents(delegatedEvents, true);

      // Fetch and process undelegated events
      const undelegatedEvents = await contract.getPastEvents(
        "StakerUndelegated",
        options
      );
      console.log("Processing", undelegatedEvents.length, "undelegated events");
      await processEvents(undelegatedEvents, false);
    } catch (error) {
      console.error(
        `Error fetching events from block ${fromBlock} to ${endBlock}:`,
        error
      );
      if (error.name === "FetchError") {
        fromBlock = Math.min(fromBlock + 20 - 1, toBlock) + 1; // Skipping 20 events
        console.log("Skipping 20 events");
        continue;
      }
    }
    console.log(
      "Est Completion Percentage: " +
        ((endBlock - fromBlock) * 100) / (toBlock - fromBlock) +
        "%"
    );
    fromBlock = endBlock + 1;
  }

  for (let key of operatorStakerMap.keys()) {
    const currentTime = BigInt(Math.floor(Date.now() / 1000));

    const operatorString = key.split("-");
    const operator = operatorString[0];
    const startTime = operatorStakerMap.get(key);

    if (operatorTimeMap.has(operator)) {
      operatorTimeMap.get(operator).push(currentTime - startTime);
    } else {
      operatorTimeMap.set(operator, [currentTime - startTime]);
    }
  }

  for (let key of operatorTimeMap.keys()) {
    const avgTime = calculateAverage(operatorTimeMap.get(key));
    operatorAvgStakingTimeMap.set(key, avgTime);
  }
}

connectDB()
  .then(() => {
    checkEventsAtBlock(delegationManager)
      .then(() => {
        console.log("Finished checking events.");
        saveAvgStakerData(operatorAvgStakingTimeMap);
      })
      .catch((err) => {
        console.error("Error checking events:", err);
      });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

//HELPER FUNCTIONS
function calculateAverage(arr) {
  const total = arr.reduce((acc, val) => acc + val, BigInt(0));
  return Number(total / BigInt(arr.length));
}
