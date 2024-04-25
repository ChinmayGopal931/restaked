const TopOperatorsTable = ({ operators }) => {
    console.log("DEBUG", operators);

    const topTwentyOperators = operators.slice(0, 20);

    return (
        <div className="top-operators-table">
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Operator</th>
                        <th>TVL (ETH)</th>
                        <th>Stakers</th>
                        <th>AVS Opt-Ins</th>
                    </tr>
                </thead>
                <tbody>
                    {topTwentyOperators.map((operator, index) => (
                        <tr key={operator.operator || index}>
                            <td>{index + 1}</td>
                            <td>{operator.name}</td>
                            <td>{operator.totalTVL}</td>
                            <td>{operator.stakers}</td>
                            <td>{operator.avsOptIns}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopOperatorsTable;
