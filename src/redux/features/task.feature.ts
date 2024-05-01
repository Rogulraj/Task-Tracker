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
  taskList: [
    {
      id: "sdvv-dvv-dsvev-dvv-sacxvf",
      aboutTask: "Task 1 description",
      assignedList: ["rogul"],
      dueTo: "04/10/2024",
      status: "Completed",
      tags: ["ui"],
      title: "Task 1",
    },
    {
      id: "dfvf-dfvf-ewrcd-dfvf-ggtyui",
      aboutTask: "Task 2 description",
      assignedList: ["johndoe", "janedoe"],
      dueTo: "05/15/2024",
      status: "In Progress",
      tags: ["backend", "api"],
      title: "Task 2",
    },
    {
      id: "hjkl-hjkl-asdfg-hjkl-qwerty",
      aboutTask: "Task 3 description",
      assignedList: ["smith", "doe"],
      dueTo: "06/20/2024",
      status: "Todo",
      tags: ["frontend", "design"],
      title: "Task 3",
    },
    {
      id: "qwer-qwer-asdf-zxcv-1234",
      aboutTask: "Task 4 description",
      assignedList: ["alice", "bob"],
      dueTo: "07/25/2024",
      status: "Todo",
      tags: ["database", "optimization"],
      title: "Task 4",
    },
    {
      id: "zxcv-zxcv-qwerty-asdf-5678",
      aboutTask: "Task 5 description",
      assignedList: ["charlie", "david"],
      dueTo: "08/30/2024",
      status: "In Progress",
      tags: ["testing", "automation"],
      title: "Task 5",
    },
    {
      id: "asdf-asdf-5678-qwer-9876",
      aboutTask: "Task 6 description",
      assignedList: ["ellen"],
      dueTo: "09/10/2024",
      status: "Completed",
      tags: ["security"],
      title: "Task 6",
    },
    {
      id: "mnbv-mnbv-1234-qwer-0987",
      aboutTask: "Task 7 description",
      assignedList: ["frank"],
      dueTo: "10/15/2024",
      status: "Completed",
      tags: ["frontend", "bug-fixing"],
      title: "Task 7",
    },
    {
      id: "0987-0987-0987-0987-5432",
      aboutTask: "Task 8 description",
      assignedList: ["gary", "helen"],
      dueTo: "11/20/2024",
      status: "Todo",
      tags: ["documentation"],
      title: "Task 8",
    },
    {
      id: "1234-1234-1234-1234-5678",
      aboutTask: "Task 9 description",
      assignedList: ["irene", "jack"],
      dueTo: "12/25/2024",
      status: "In Progress",
      tags: ["backend", "performance"],
      title: "Task 9",
    },
    {
      id: "9876-9876-9876-9876-5432",
      aboutTask: "Task 10 description",
      assignedList: ["kevin"],
      dueTo: "01/01/2025",
      status: "Completed",
      tags: ["ui", "usability"],
      title: "Task 10",
    },
    {
      id: "5432-5432-5432-5432-5432",
      aboutTask: "Task 11 description",
      assignedList: ["linda", "mike"],
      dueTo: "02/05/2025",
      status: "Todo",
      tags: ["frontend", "react"],
      title: "Task 11",
    },
    {
      id: "abcd-abcd-abcd-abcd-1234",
      aboutTask: "Task 12 description",
      assignedList: ["nancy", "oscar"],
      dueTo: "03/10/2025",
      status: "In Progress",
      tags: ["backend", "node.js"],
      title: "Task 12",
    },
    {
      id: "9876-5432-abcd-1234-5678",
      aboutTask: "Task 13 description",
      assignedList: ["peter", "quinn"],
      dueTo: "04/15/2025",
      status: "Completed",
      tags: ["testing", "qa"],
      title: "Task 13",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskListItem>) => {
      state.taskList.unshift(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskListItem>) => {
      state.taskList = state.taskList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTask: (state, action: PayloadAction<{ id: UUID }>) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
  },
});

export const taskReducer = taskSlice.reducer;
export const taskActions = taskSlice.actions;
