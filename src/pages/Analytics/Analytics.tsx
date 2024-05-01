// packages
import React, { FC, useMemo } from "react";

// css
import ds from "./Analytics.module.css";

// models
import { TaskModel } from "@models/task.model";

// services
import { useGetAllTasksQuery } from "@services/task.service";

// components
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import PrimaryHeader from "@components/Headers/PrimaryHeader";
import TaskDueDatesChart from "@components/Charts/TaskDueDatesChart/TaskDueDatesChart";
import StatusPieChart from "@components/Charts/StatusPieChart/StatusPieChart";
import TaskStatusRadarChart from "@components/Charts/TaskStatusRadarChart/TaskStatusRadarChart";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

// types
interface AnalyticsPropsType {}

const Analytics: FC<AnalyticsPropsType> = ({}) => {
  const { data: taskData } = useGetAllTasksQuery("");
  const taskList: TaskModel[] = useMemo(() => {
    return taskData?.data || [];
  }, [taskData]);

  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="Analytics" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={ds.content_container}>
          <h2 className={ds.status_pie_chart_title}>Task Status Charts</h2>
          <p className={ds.status_pie_chart_text}>
            The pie and radar chart provides a clear and concise way to
            visualize the overall distribution of tasks across different
            statuses ("Todo", "In Progress", "Completed"). It extracts the
            number of tasks in each status from your task data (data). The size
            of the slice corresponds to the proportion of tasks in that status
            relative to the total number of tasks. For example, a larger slice
            for "Todo" indicates there are more tasks in the "Todo" state
            compared to others.
          </p>
          <div className={ds.status_pie_chart}>
            <StatusPieChart data={taskList} />
          </div>
          <div className={ds.radar_chart}>
            <TaskStatusRadarChart data={taskList} />
          </div>
          <h2 className={ds.status_pie_chart_title}>Task Due Distribution</h2>
          <p className={ds.status_pie_chart_text}>
            This visualization provides a clear comparison between the total
            workload and the completed tasks across months. The bar chart
            effectively highlights the overall volume of tasks. The line chart
            with two lines helps identify trends in both total and completed
            tasks.
          </p>
          <div className={ds.radar_chart}>
            <TaskDueDatesChart data={taskList} variant="barchart" />
          </div>
          <div className={ds.radar_chart}>
            <TaskDueDatesChart data={taskList} variant="linechart" />
          </div>
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default Analytics;
