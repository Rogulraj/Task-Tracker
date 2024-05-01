import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Task {
  id: string;
  aboutTask: string;
  assignedList: string[];
  dueTo: string;
  status: string;
  tags: string[];
  title: string;
}

const TaskDueDatesChart: React.FC<{
  data: Task[];
  varinat: "barchart" | "linechart";
}> = ({ data, varinat }) => {
  const dueDatesByMonth = data.reduce(
    (acc: { [key: number]: number[] }, task) => {
      const month = new Date(task.dueTo).getMonth() + 1; // Assuming month starts from 1
      acc[month] = (acc[month] || []).concat(task);
      return acc;
    },
    {}
  );

  const chartData: { month: string; count: number }[] = Object.entries(
    dueDatesByMonth
  ).map(([month, tasks]) => ({
    month: `Month ${month}`,
    count: tasks.length,
  }));

  const completedTasksByMonth = data.reduce(
    (acc: { [key: number]: number }, task) => {
      if (task.status === "Completed") {
        const month = new Date(task.dueTo).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const findVarinat = useMemo(() => {
    switch (varinat) {
      case "barchart":
        return (
          <ResponsiveContainer height={"100%"} width={"100%"}>
            <BarChart width={400} height={300} data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" stroke="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "linechart":
        return (
          <ResponsiveContainer height={"100%"} width={"100%"}>
            <LineChart width={400} height={300} data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ff7300" />
              <Line
                type="monotone"
                dataKey={completedTasksByMonth}
                stroke="#4caf50"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  }, [varinat, data]);

  return findVarinat;
};

export default TaskDueDatesChart;
