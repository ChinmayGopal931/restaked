const mongoose = require("mongoose");
const DelegationManager = require("../../db/DelegationManager");
/**
 * Function to add or update an AVS entry with new operators.
 * @param {string} avs - The AVS identifier.
 * @param {string[]} operators - List of operators to add.
 */
async function saveAVSData(avsDataMap) {
  try {
    for (const [operator, avsOptIns] of Object.entries(avsDataMap)) {
      await DelegationManager.updateMany(
        { operator }, // Match condition
        { $addToSet: { avsOptIns: avsOptIns } } // Update action
      );
    }
    console.log("AVS opt-ins updated based on matching operators.");
  } catch (error) {
    console.error("Failed to update AVS opt-ins:", error);
  }
}

module.exports = { saveAVSData };
