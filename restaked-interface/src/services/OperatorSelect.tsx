function OperatorSelect({ operators, selectedOperator, onChange }) {
    return (
        <select
            className="operator-select"
            value={selectedOperator}
            onChange={e => onChange(e.target.value)}
        >
            <option value="">Select Operator</option>
            {operators.map((op, index) => (
                <option key={index} value={op.operator}>{op.name}</option>
            ))}
        </select>
    );
}

export default OperatorSelect;
