import { useNavigate } from "react-router-dom";

const TopOperatorsTable = ({ operators }: any) => {
  const navigate = useNavigate(); // Hook to get the navigate function
  const topTwentyOperators = operators.slice(0, 20);

  const handleRowClick = (operatorAddress: string) => {
    navigate(`/operator/${operatorAddress}`); // Navigate to the operator's page
  };

  return (
    <div className="top-operators-table overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Rank
            </th>
            <th scope="col" className="px-6 py-3">
              Operator
            </th>
            <th scope="col" className="px-6 py-3">
              TVL (ETH)
            </th>
            <th scope="col" className="px-6 py-3">
              Stakers
            </th>
            <th scope="col" className="px-6 py-3">
              AVS Opt-Ins
            </th>
          </tr>
        </thead>
        <tbody>
          {topTwentyOperators.map((operator: any, index: number) => (
            <tr
              key={operator.operator || index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              onClick={() => handleRowClick(operator.operator)}
            >
              <td className="px-6 py-4">{index + 1}</td>

              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap display flex row gap-2">
                <div className="">
                  <img src={operator.logo} className="w-8 h-8 rounded-md" />
                </div>
                <div className="mt-1">{operator.name}</div>
              </td>
              <td className="px-6 py-4">{operator.totalTVL}</td>
              <td className="px-6 py-4">{operator.stakers}</td>
              <td className="px-6 py-4">{operator.avsOptIns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopOperatorsTable;
