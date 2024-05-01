import { TaskModel } from "@models/task.model";
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: TaskModel[];
}

const TaskStatusRadarChart: React.FC<Props> = ({ data }) => {
  // Count the occurrences of each status
  const statusCounts: { [key: string]: number } = {
    Todo: 0,
    "In Progress": 0,
    Completed: 0,
  };
  data.forEach((task) => {
    statusCounts[task.status]++;
  });

  // Format data for radar chart
  const chartData = Object.keys(statusCounts).map((status) => ({
    status,
    count: statusCounts[status],
  }));

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <RadarChart outerRadius={150} data={chartData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="status" />
        <Radar
          name="Count"
          dataKey="count"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default TaskStatusRadarChart;
