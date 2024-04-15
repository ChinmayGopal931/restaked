import { useMemo } from 'react';

const TopOperatorsTable = ({ operators = [] }) => {

    const sortedOperators = useMemo(() => {
        if (operators.length > 0) {
            return operators
                .sort((a, b) => b.totalShares - a.totalShares)
                .slice(0, 20);
        }
        return [];
    }, [operators]);  

    return (
        <div className="top-operators-table">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Operator</th>
                        <th>TVL (ETH)</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedOperators.map((operator, index) => (
                        <tr key={operator.operator || index}>
                            <td>{index + 1}</td>
                            <td>{operator.name}</td>
                            <td>{operator.totalShares.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopOperatorsTable;
