import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip  p-3 rounded shadow-lg">
        <p className="label">{`Date: ${new Date(
          payload?.[0]?.payload.timeStamp
        ).toLocaleDateString("en-US", {
          year: "2-digit", // "2-digit" for two-digit year
          month: "2-digit", // "2-digit" for two-digit month
          day: "2-digit", // "2-digit" for two-digit day
        })};
          `}</p>
        <div className="flex flex-row items-center mr-10">
          <p className="intro">{`Shares: ${payload?.[0]?.value}`}</p>
        </div>
      </div>
    );
  }

  return null;
};

interface ShareChartProps {
  data: any[];
}

export default class ShareChart extends PureComponent<ShareChartProps> {
  render() {
    const { data } = this.props; // Receive data as a prop
    console.log("eeee", data);
    return (
      <ResponsiveContainer width="100%" aspect={1.6}>
        <LineChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <YAxis type="number" domain={[0.98, 1.025]} />

          <XAxis
            dataKey="timeStamp"
            tickFormatter={(date) => {
              // Assuming 'date' directly contains the timestamp or ISO date string
              const dateObj = new Date(date);
              return dateObj.toLocaleDateString("en-US", {
                year: "2-digit", // "2-digit" for two-digit year
                month: "2-digit", // "2-digit" for two-digit month
                day: "2-digit", // "2-digit" for two-digit day
              });
            }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#73DD40"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="shares" stroke="#2775C9" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
