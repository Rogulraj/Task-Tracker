// packages
import React, { FC, useCallback } from "react";

// css
import ds from "./TotalTaskStatus.module.css";
import { TaskStatusType } from "@constants/taskStatus";

// types
interface TotalTaskStatusPropsType {
  taskStatus: TaskStatusType;
  totalTask: number;
}

const TotalTaskStatus: FC<TotalTaskStatusPropsType> = ({
  taskStatus,
  totalTask,
}) => {
  const findTaskStatus = useCallback(
    (status: TaskStatusType) => {
      switch (status) {
        case "Todo":
          return (
            <div className={ds.status_overview_card}>
              <div className={`${ds.total_status_card} ${ds.todo_card}`}>
                <p className={ds.total_status}>{totalTask}</p>
              </div>
              <h4 className={ds.status_overview_title}>{status}</h4>
            </div>
          );

        case "In Progress":
          return (
            <div className={ds.status_overview_card}>
              <div className={`${ds.total_status_card} ${ds.in_progress_card}`}>
                <p className={ds.total_status}>{totalTask}</p>
              </div>
              <h4 className={ds.status_overview_title}>{status}</h4>
            </div>
          );
        case "Completed":
          return (
            <div className={ds.status_overview_card}>
              <div className={`${ds.total_status_card} ${ds.completed_card}`}>
                <p className={ds.total_status}>{totalTask}</p>
              </div>
              <h4 className={ds.status_overview_title}>{status}</h4>
            </div>
          );
        default:
          return null;
      }
    },
    [taskStatus, totalTask]
  );

  return findTaskStatus(taskStatus);
};

export default TotalTaskStatus;
