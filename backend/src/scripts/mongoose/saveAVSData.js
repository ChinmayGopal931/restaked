const DelegationManager = require("../../db/DelegationManager");
const { ethers } = require("ethers");

/**
 * Function to add or update an AVS entry with new operators.
 * @param {string} avs - The AVS identifier.
 * @param {string[]} operators - List of operators to add.
 */
async function saveAVSData(avsDataMap) {
  try {
    for (const [avs, operators] of Object.entries(avsDataMap)) {
      // Iterate over each operator for the current AVS

      if (operators.length > 0) {
        for (const operator of operators) {
          // Find documents with this operator and update them
          await DelegationManager.updateMany(
            { operator: operator }, // Match condition
            { $addToSet: { avsOptIns: { $each: [avs] } } }
          );
        }
      }
    }
    console.log("AVS opt-ins updated based on matching operators.");
  } catch (error) {
    console.error("Failed to update AVS opt-ins:", error);
  }
}

module.exports = { saveAVSData };
