const backendUrl = "./"

export async function fetchOperators() {
    try {
        const response = await fetch(`${backendUrl}api/unique-operators`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Unable to fetch operators');
        }
        return data.data.map(op => {
            return { 
                name: op.operatorName, 
                operator: op.operatorAddress, 
                stakers: op.uniqueStakers,
                avsOptIns: op.avsOptIns.length,
                totalTVL: op.totalTVL  
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

