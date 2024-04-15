export async function fetchOperators() {
    try {
        const response = await fetch('http://localhost:8080/api/unique-operators');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Unable to fetch operators');
        }
        return data.data.map(op => {
            return { 
                name: op.name, 
                operator: op.operator, 
                totalShares: op.totalShares  // Assuming totalShares is now included
            };
        });
    } catch (error) {
        console.error('Failed to fetch operators:', error);
        throw error; // Rethrow the error to handle it in the calling component
    }
}

export async function fetchDataForOperator(selectedOperator) {
    try {
        const url = `http://localhost:8080/api/operator-shares/${selectedOperator}`;
        console.log(`Fetching shares for operator ${selectedOperator}`);
        const response = await fetch(url);
        const newData = await response.json();
        if (!response.ok) {
            throw new Error(newData.message || 'No data available to display');
        }
        return {
            labels: newData.data.map(item => {
                // Ensure timestamps are formatted as MM-DD-YYYY
                const date = new Date(item.x * 1000);
                return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
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

export async function fetchTopOperators() {
    try {
        const response = await fetch('http://localhost:8080/api/top-operators');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Unable to fetch top operators');
        }

        return data.data.map((op, index) => {
            return {
                rank: index + 1,
                name: op.name,
                operator: op.operator,
                totalShares: op.totalShares
            };
        });
    } catch (error) {
        console.error('Failed to fetch top operators:', error);
        throw error; 
    }
}
