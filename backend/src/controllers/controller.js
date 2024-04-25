const DelegationManager = require("../db/DelegationManager");
const OperatorProfile = require("../db/OperatorProfile");
const TotalTVLOverTime = require("../db/TVLOverTime"); 
const { getSharesToTVL } = require("../utils/utils");
const connectDB = require('../db/db');

connectDB()

async function fetchUniqueOperators() {
  try {
    const operatorsRAWData = await DelegationManager.aggregate([
      {
        $facet: {
          metadata: [
            { $match: { metadataURI: { $exists: true, $ne: null } } },
            { $sort: { timestamp: -1 } },
            {
              $group: {
                _id: "$operator",
                latestMetadataURI: { $first: "$metadataURI" },
              },
            },
          ],
          stakersAndStrategies: [
            {
              $match: {
                operator: { $exists: true },
                staker: { $exists: true },
                strategy: { $exists: true },
              },
            },
            { $sort: { timestamp: -1 } },  
            {
              $group: {
                _id: "$operator",
                uniqueStakers: { $addToSet: "$staker" },
                uniqueStrategies: { $addToSet: "$strategy" },
                avsOptIns: { $first: "$avsOptIns" }  
              },
            },
          ],
        },
      },
      {
        $project: {
          operatorsData: {
            $map: {
              input: "$metadata",
              as: "metadata",
              in: {
                operator: "$$metadata._id",
                latestMetadataURI: "$$metadata.latestMetadataURI",
                uniqueStakers: {
                  $reduce: {
                    input: "$stakersAndStrategies",
                    initialValue: [],
                    in: {
                      $cond: [
                        { $eq: ["$$metadata._id", "$$this._id"] },
                        "$$this.uniqueStakers",
                        "$$value",
                      ],
                    },
                  },
                },
                uniqueStrategies: {
                  $reduce: {
                    input: "$stakersAndStrategies",
                    initialValue: [],
                    in: {
                      $cond: [
                        { $eq: ["$$metadata._id", "$$this._id"] },
                        "$$this.uniqueStrategies",
                        "$$value",
                      ],
                    },
                  },
                },
                avsOptIns: {
                  $arrayElemAt: [
                    "$stakersAndStrategies.avsOptIns",
                    0
                  ] 
                }
              },
            },
          },
        },
      },
      { $unwind: "$operatorsData" },
      { $replaceRoot: { newRoot: "$operatorsData" } },
    ]);

    const operatorData = await Promise.all(
      operatorsRAWData.map(async (doc) => {
        const metaData = {};
        const regex = /\.com\/([^\/]+)/;
        const match = doc.latestMetadataURI.match(regex);
        const operatorName = match ? match[1] : "Unknown";

        try {
          const response = await fetch(doc.latestMetadataURI);
          const data = await response.json();
          metaData.name = data.name || operatorName;
          metaData.website = data.website || "";
          metaData.description = data.description || "";
          metaData.logo = data.logo || "";
          metaData.twitter = data.twitter || "";
        } catch (error) {
          metaData.name = operatorName;
          metaData.website = "";
          metaData.description = "";
          metaData.logo = "";
          metaData.twitter = "";
        }

        return {
          operatorName: metaData.name,
          operatorAddress: doc.operator,
          operatorWebsite: metaData.website,
          operatorLogo: metaData.logo,
          operatorDescription: metaData.description,
          operatorTwitter: metaData.twitter,
          uniqueStrategies: doc.uniqueStrategies,
          uniqueStakers: doc.uniqueStakers,
          avsOptIns: doc.avsOptIns
        };
      })
    );

    return operatorData;
  } catch (error) {
    console.error("Failed to fetch unique operators:", error);
    return [];
  }
}

async function trackSharesForOperator(operatorAddress) {
  try {
    const events = await DelegationManager.find({
      operator: operatorAddress,
      event: { $in: ["OperatorSharesIncreased", "OperatorSharesDecreased"] }
    })
    .sort({ timestamp: 1 })
    .select("event shares strategy timestamp -_id");

    let totalTVL = 0;
    const sharesTimeline = [];
    const strategyCache = {};

    for (const event of events) {
      let underlyingTokens = 0;

      if (strategyCache[event.strategy]) {
        underlyingTokens = strategyCache[event.strategy] * event.shares;
      } else {
        const ratio = await getSharesToTVL(event.strategy);
        strategyCache[event.strategy] = ratio;
        underlyingTokens = ratio * event.shares;
      }

      if (event.event === "OperatorSharesIncreased") {
        totalTVL += underlyingTokens;
      } else if (event.event === "OperatorSharesDecreased") {
        totalTVL -= underlyingTokens;
      }

      const tvlEntry = new TotalTVLOverTime({
        operator: operatorAddress,
        totalTVL: totalTVL,
        timestamp: new Date(event.timestamp * 1000)
      });
      await tvlEntry.save();

      console.log(tvlEntry)

      sharesTimeline.push({
        totalTVL: totalTVL
      });
    }

    return sharesTimeline;
  } catch (error) {
    console.error("Error tracking shares for operator:", error);
    return [];
  }
}


async function rankOperators() {
  try {
    let operators = await fetchUniqueOperators();

    const operatorShares = await Promise.all(
      operators.map(op => 
          trackSharesForOperator(op.operatorAddress).then(shares => ({
          operatorName: op.operatorName,
          operatorAddress: op.operatorAddress,
          operatorWebsite: op.operatorWebsite,
          operatorTwitter: op.operatorTwitter,
          operatorLogo: op.operatorLogo,
          operatorDescription: op.operatorDescription,
          uniqueStrategies: op.uniqueStrategies,
          uniqueStakers: op.uniqueStakers.length,
          totalTVL: shares.length > 0 ? shares[shares.length - 1].totalTVL : 0,
          avsOptIns: op.avsOptIns
        }))
      )
    );

    const validOperators = operatorShares.filter(op => op.totalTVL >= 32);

    console.log(validOperators)

    await OperatorProfile.insertMany(validOperators);
    console.log("Operators ranked and saved successfully.");
  } catch (error) {
    console.error("Failed to save operators:", error);
  }
}

rankOperators()

OperatorProfile.find()
  .then(docs => {
    console.log(JSON.stringify(docs, null, 2)); 
  })
  .catch(err => {
    console.error('Error fetching documents:', err);
  });

module.exports = {
  trackSharesForOperator,
};
