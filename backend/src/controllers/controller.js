const DelegationManager = require('../db/DelegationManager');

async function fetchUniqueOperators() {
    try {

        const operatorsData = await DelegationManager.aggregate([
            {
                $match: {
                    metadataURI: { $exists: true, $ne: null }  
                }
            },
            {
                $sort: { timestamp: -1 }  
            },
            {
                $group: {
                    _id: "$operator",
                    latestMetadataURI: { $first: "$metadataURI" }  
                }
            }
        ]);

        const operatorsWithNames = operatorsData.map(doc => {
            const regex = /\.com\/([^\/]+)/;  
            const match = doc.latestMetadataURI.match(regex);
            const operatorName = match ? match[1] : 'Unknown'; 
            return { operatorName, operator: doc._id };
        });

        return operatorsWithNames;
    } catch (error) {
        console.error('Failed to fetch unique operators:', error);
        return [];
    }
}


async function trackSharesForOperator(operator) {
    try {
        const events = await DelegationManager.find({ operator })
            .sort({ timestamp: 1 })
            .select('event shares timestamp -_id');

        let totalShares = 0;
        const sharesTimeline = events.reduce((acc, event) => {
            if (event.event === 'OperatorSharesIncreased') {
                totalShares += event.shares;
            } else if (event.event === 'OperatorSharesDecreased') {
                totalShares -= event.shares;
            }
            acc.push({ timestamp: event.timestamp, totalShares });
            return acc;
        }, []);

        return sharesTimeline;
    } catch (error) {
        console.error('Error tracking shares for operator:', error);
        return [];
    }
}

async function rankOperatorsByShares() {
    const operators = await fetchUniqueOperators(); 
    const operatorShares = await Promise.all(
        operators.map(op => trackSharesForOperator(op.operator).then(shares => {
            return {
                name: op.operatorName,
                operator: op.operator,
                totalShares: shares.length > 0 ? shares[shares.length - 1].totalShares : 0
            };
        }))
    );

    const rankedOperators = operatorShares.sort((a, b) => b.totalShares - a.totalShares);
    rankedOperators.forEach((op, index) => op.rank = index + 1);  

    return rankedOperators;
}




module.exports = { fetchUniqueOperators, trackSharesForOperator, rankOperatorsByShares };
