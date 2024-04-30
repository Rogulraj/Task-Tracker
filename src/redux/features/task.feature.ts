import { TaskStatusType } from "@constants/taskStatus";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UUID } from "crypto";

export interface TaskListItem {
  id: UUID;
  title: string;
  dueTo: string;
  tags: string[];
  assignedList: string[];
  status: TaskStatusType;
  aboutTask: string;
}

interface TaskState {
  taskList: TaskListItem[];
}

const initialState: TaskState = {
  taskList: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskListItem>) => {
      state.taskList.push(action.payload);
    },
  },
});

export const taskReducer = taskSlice.reducer;
export const taskActions = taskSlice.actions;
