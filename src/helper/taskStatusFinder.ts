import { TaskStatusType } from "@constants/taskStatus";

export const isTaskStatus = (
  taskStatusList: TaskStatusType[],
  val: TaskStatusType
) => {
  const index = taskStatusList.findIndex((item) => item === val);

  if (index === -1) {
    return false;
  }
  return true;
};
