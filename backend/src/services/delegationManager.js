
const { Web3 } = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/32a39c105d1d49f395bcb2ce44014d1d");
const {checkEventsAtBlock} = require('./delegationManagerMethods')
const {delegationManager} = require('./contracts')
const cron = require('node-cron');
const connectDB = require('../db/db');

connectDB().then(() => {
    console.log('Connected to MongoDB through db module');}
)

async function callDelegationManagerEventLogs(){
    const contract = delegationManager
    const eventName = "allEvents"
    const addressFilter = ""
    
    try {
        if (contract) {
            await checkEventsAtBlock(contract, eventName, addressFilter);
            console.log("Data saved!");
        } else {
            console.log({error: 'Invalid contract name provided' });
        }
    } catch (error) {
        console.log(`Error fetching events: ${error.message}`);
    }
};



