import { TaskStatusType } from "@constants/taskStatus";

export interface TaskModel {
  _id?: string;
  title: string;
  dueTo: string;
  status: TaskStatusType;
  tags: string[];
  assignedList: string[];
  aboutTask: string;
}
