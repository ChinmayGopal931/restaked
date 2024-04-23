const DelegationManager = require("../db/DelegationManager");
const { getSharesToTVL } = require("../utils/utils");

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
            {
              $group: {
                _id: "$operator",
                uniqueStakers: { $addToSet: "$staker" },
                uniqueStrategies: { $addToSet: "$strategy" },
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
        };
      })
    );

    return operatorData;
  } catch (error) {
    console.error("Failed to fetch unique operators:", error);
    return [];
  }
}

async function trackSharesForOperator(operator) {
  try {
    const events = await DelegationManager.find({ operator })
      .sort({ timestamp: 1 })
      .select("event shares strategy timestamp -_id");

    let totalShares = 0;
    let totalTVL = 0;
    const sharesTimeline = [];

    for (const event of events) {
      if (event.event === "OperatorSharesIncreased") {
        const underlyingTokens = await getSharesToTVL(
          event.strategy,
          event.shares
        );
        totalShares += event.shares; // Add shares
        totalTVL += underlyingTokens; // Add the TVL from shares converted
      } else if (event.event === "OperatorSharesDecreased") {
        const underlyingTokens = await getSharesToTVL(
          event.strategy,
          event.shares
        );
        totalShares -= event.shares; // Subtract shares
        totalTVL -= underlyingTokens; // Subtract the TVL from shares converted
      }

      // Push the new state to the timeline after each event is processed
      sharesTimeline.push({
        timestamp: event.timestamp,
        totalShares: totalShares,
        totalTVL: totalTVL,
      });
    }

    return sharesTimeline;
  } catch (error) {
    console.error("Error tracking shares for operator:", error);
    return [];
  }
}

async function rankOperatorsByShares() {
  const operators = await fetchUniqueOperators();
  const operatorShares = await Promise.all(
    operators.map(
      async (op) =>
        await trackSharesForOperator(op.operatorAddress).then((shares) => {
          return {
            name: op.operatorName,
            operatorAddress: op.operatorAddress,
            totalShares:
              shares.length > 0 ? shares[shares.length - 1].totalShares : 0,
            totalTVL:
              shares.length > 0 ? shares[shares.length - 1].totalTVL * 3100 : 0, //TODO NEEDS TO BE FIXED
          };
        })
    )
  );

  const rankedOperators = operatorShares.sort(
    (a, b) => b.totalShares - a.totalShares
  );
  rankedOperators.forEach((op, index) => (op.rank = index + 1));

  return rankedOperators;
}

async function rankOperators() {
  const operators = (await fetchUniqueOperators()).slice(0, 10);

  const operatorShares = await Promise.all(
    operators.map((op) =>
      trackSharesForOperator(op.operatorAddress).then((shares) => {
        return {
          name: op.operatorName,
          totalShares:
            shares.length > 0 ? shares[shares.length - 1].totalShares : 0,
          operators: op.operator,
          uniqueStrategies: op.uniqueStrategies,
          uniqueStakers: op.uniqueStakers,
          totalTVL: shares.length > 0 ? shares[shares.length - 1].totalTVL : 0,
          operatorName: op.operatorName,
          operatorAddress: op.operatorAddress,
          operatorWebsite: op.operatorWebsite,
          operatorTwitter: op.operatorTwitter,
          operatorLogo: op.operatorLogo,
          operatorDescription: op.operatorDescription,
        };
      })
    )
  );

  const rankedOperators = operatorShares.sort(
    (a, b) => b.totalShares - a.totalShares
  );
  rankedOperators.forEach((op, index) => (op.rank = index + 1));

  return rankedOperators;
}

module.exports = {
  fetchUniqueOperators,
  trackSharesForOperator,
  rankOperatorsByShares,
  rankOperators,
};
