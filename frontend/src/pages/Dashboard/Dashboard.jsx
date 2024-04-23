import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { fetchOperators, fetchDataForOperator } from '../../services/DashboardServices'; 
import OperatorSelect from '../../services/OperatorSelect'; 
import TopOperatorsTable from '../../services/TopOperatorsTable'; 
import './Dashboard.css'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function Dashboard() {
    const [operators, setOperators] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState('');
    const [chartData, setChartData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            const ops = await fetchOperators();
            setOperators(ops);
        } catch (error) {
            console.error('Error fetching initial data:', error);
            setErrorMessage('Failed to load initial dashboard data.');
        }
    };

    const handleFetchData = async () => {
        if (!selectedOperator) {
            setErrorMessage('Please select an operator name.');
            return;
        }
        try {
            const data = await fetchDataForOperator(selectedOperator);
            setChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('Failed to fetch data from the server.');
        }
    };

    return (
        <div className="dashboard-container">
            <OperatorSelect
                operators={operators}
                selectedOperator={selectedOperator}
                onChange={setSelectedOperator}
            />
            <button onClick={handleFetchData} className="fetch-data-button btn btn-light btn-lg">Load Chart</button>
            {chartData ? <Line data={chartData} /> : <p>{errorMessage || 'Loading operators...'}</p>}
            <TopOperatorsTable operators={operators} /> 
        </div>
    );
}

export default Dashboard;
