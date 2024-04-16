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



