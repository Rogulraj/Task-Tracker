import { TaskModel } from "@models/task.model";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: TaskModel[];
}

const StatusPieChart: React.FC<Props> = ({ data }) => {
  // Extracting status counts from the data
  const statusCounts: { [key: string]: number } = data.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  // Formatting data for the pie chart
  const pieChartData = Object.keys(statusCounts)
    .map((status) => ({
      name: status,
      value: statusCounts[status],
    }))
    .reverse();

  // Define colors for each status
  const COLORS = ["#ff7a00", "#3651d9", "#00b81d"];

  return (
    <ResponsiveContainer height={"100%"} width={"100%"}>
      <PieChart width={400} height={300}>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value">
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;
