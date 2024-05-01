// packages
import React, { FC, useMemo } from "react";

// css
import ds from "./TaskStatusListCard.module.css";
import { TaskStatusType } from "@constants/taskStatus";
import { useAppSelector } from "@redux/store/store";
import TaskCard from "../TaskCard/TaskCard";
import { useGetAllTasksQuery } from "@services/task.service";
import { TaskModel } from "@models/task.model";

// types
interface TaskStatusListCardPropsType {
  taskStatus: TaskStatusType;
}

const TaskStatusListCard: FC<TaskStatusListCardPropsType> = ({
  taskStatus,
}) => {
  const { data: taskData } = useGetAllTasksQuery("");

  /** useMemo Methods */
  const taskList: TaskModel[] = useMemo(() => {
    return taskData?.data || [];
  }, [taskData]);

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

  const taskStatusList = useMemo(() => {
    const newList = taskList.filter((item) => item.status === taskStatus);
    return newList;
  }, [taskStatus, taskList]);

  return (
    <div className={ds.main_layout}>
      <div className={ds.status_header_card}>
        <div className={`${ds.status_icon} ${findIconBg}`}></div>
        <h3 className={ds.status_title}>{taskStatus}</h3>
      </div>
      <ul className={ds.task_list_container}>
        {taskStatusList.map((item, index) => (
          <li key={index} className={ds.task_item_card}>
            <TaskCard taskItem={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskStatusListCard;
