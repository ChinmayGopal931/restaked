// api/daily-update.js
import { updateAVSData } from "../../scripts/populateAVSData";
import { populateAverageStakingTime } from "../../scripts/populateAverageStakingTime";
import { trackSharesForOperator } from "../../scripts/populateUniqueOperators";
const {cron} = require('node-cron');

const job = cron.schedule('0 9 * * 1-5', async () => {
  try {
    await updateAVSData();
    await populateAverageStakingTime();
    await trackSharesForOperator();

    res.status(200).json({ message: "Update completed successfully." });
  } catch (error) {
    console.error("Error running chron job:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

job.start();
