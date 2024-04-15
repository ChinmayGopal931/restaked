require('dotenv').config({path: '../../.env'});
const { Web3 } = require('web3');
const web3 = new Web3(process.env.RPC_URL);

const getCurrentBlockNumber = async () => {
    try {
      const currentBlockNumber = await web3.eth.getBlockNumber();
      console.log("Current Block Number:", currentBlockNumber);
      return Number(currentBlockNumber);
    } catch (error) {
      console.error("Error fetching current block number:", error);
    }
  }

  async function fetchLastBlock() {
    const lastEventRaw = await DelegationManager.findOne().sort({ block: -1 });
    const lastEvent = Number(lastEventRaw)
    return lastEvent ? lastEvent.block + 1 : 19612227; // Start from a default block if none is found
}


  function weiToEth(weiValue) {
    const eth = web3.utils.fromWei(weiValue, 'ether');
    console.log(`Converted ${weiValue} Wei to ${eth} Ether`);
    return eth;
}

async function saveToMongoDB(model, data) {
    if (!model || !model.insertMany) {
        console.error("Invalid model passed to saveToMongoDB");
        return;
    }

    if (data.length > 0) {
        try {
            await model.insertMany(data);
            console.log("Saved data to MongoDB successfully.");
        } catch (error) {
            console.error("Failed to save data to MongoDB:", error);
            throw error; 
        }
    } else {
        console.log("No data to save.");
    }
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}


module.exports = { getCurrentBlockNumber, fetchLastBlock, weiToEth, saveToMongoDB, padTo2Digits };
