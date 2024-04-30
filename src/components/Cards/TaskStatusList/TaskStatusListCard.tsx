// packages
import React, { FC, useMemo } from "react";

// css
import ds from "./TaskStatusListCard.module.css";
import { TaskStatusType } from "@constants/taskStatus";

// types
interface TaskStatusListCardPropsType {
  taskStatus: TaskStatusType;
}

const TaskStatusListCard: FC<TaskStatusListCardPropsType> = ({
  taskStatus,
}) => {
  /** useMemo Methods */
  const findIconBg = useMemo(() => {
    switch (taskStatus) {
      case "Todo":
        return ds.todo_bg;
      case "In Progress":
        return ds.in_progress_bg;
      case "Completed":
        return ds.completed_bg;
    }
  }, [taskStatus]);

  return (
    <div className={ds.main_layout}>
      <div className={ds.status_header_card}>
        <div className={`${ds.status_icon} ${findIconBg}`}></div>
        <h3 className={ds.status_title}>{taskStatus}</h3>
      </div>
    </div>
  );
};

export default TaskStatusListCard;
