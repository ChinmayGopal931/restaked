const backendUrl = "./"

let avsDataMap = {
    "0x870679e138bcdf293b7ff14dd44b70fc97e12fc0": "EigenDA",
    "0x71a77037870169d47aad6c2c9360861a4c0df2bf": "AltLayer",
    "0xd25c2c5802198cb8541987b73a8db4c9bcae5cc7": "Witness",
    "0x23221c5bb90c7c57ecc1e75513e2e4257673f0ef": "eOracle",
    "0x6026b61bdd2252160691cb3f6005b6b72e0ec044": "Xterio",
    "0x35f4f28a8d3ff20eed10e087e8f96ea2641e6aa2": "LaGrange",
    "0xed2f4d90b073128ae6769a9a8d51547b1df766c8": "Omni",
    "0x9fc952bdcbb7daca7d420fa55b942405b073a89d": "Brevis",
};

export async function fetchOperators() {
    try {
        const response = await fetch(`${backendUrl}api/unique-operators`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Unable to fetch operators');
        }
        return data.data.map(op => {
            // Map avsOptIns addresses to corresponding names, ensuring case insensitivity
            const avsOptInsNames = op.avsOptIns.map(address => avsDataMap[address.toLowerCase()]).filter(name => name);
            return {
                name: op.operatorName,
                operator: op.operatorAddress,
                stakers: op.uniqueStakers,
                avsOptIns: avsOptInsNames.length ? avsOptInsNames.join(', ') : 'None',  // Join names for display
                totalTVL: parseFloat(op.totalTVL).toFixed(2)
            };
        });
    } catch (error) {
        console.error('Failed to fetch operators:', error);
        throw error;
    }
}

export async function fetchDataForOperator(selectedOperator) {
    try {
        const url = `${backendUrl}api/operator-shares/${selectedOperator}`;
        console.log(`Fetching shares for operator ${selectedOperator}`);
        const response = await fetch(url);
        const newData = await response.json();
        if (!response.ok) {
            throw new Error(newData.message || 'No data available to display');
        }
        return {
            labels: newData.data.map(item => {
                const date = item.x;
                return date;
            }),
            datasets: [{
                label: 'Cumulative Shares (ETH)',
                data: newData.data.map(item => item.y),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        };
    } catch (error) {
        console.error('Failed to fetch data for operator:', error);
        throw error; 
    }
}
