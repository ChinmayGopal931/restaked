import React from 'react';
import { Line } from 'react-chartjs-2';

function ChartContainer({ chartData }) {
    return (
        <div className="chart-modal-container bg-dark text-white p-4">
            <div className="chart-container">
                {chartData && chartData.labels.length > 0 ? (
                    <Line data={chartData} />
                ) : (
                    <p>No data to display</p>
                )}
            </div>
        </div>
    );
}

export default ChartContainer;
