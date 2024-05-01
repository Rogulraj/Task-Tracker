import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";
import { CommonResponse, ResponseWithId } from "@interfaces/index";
import { TaskModel } from "@models/task.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${VITE_API_BASE_URL}:${VITE_API_PORT}/api/v1/task`;

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["tasks"],
  endpoints: (builder) => ({
    /** GET */
    getAllTasks: builder.query<CommonResponse<TaskModel[]>, unknown>({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    /** POST */
    addTask: builder.mutation<
      CommonResponse<ResponseWithId>,
      { task: TaskModel }
    >({
      query: (userData) => ({
        url: "/add",
        body: userData,
        method: "POST",
      }),
      invalidatesTags: ["tasks"],
    }),

    /** PUT */
    updateTaskById: builder.mutation<
      CommonResponse<ResponseWithId>,
      { taskId: string; task: TaskModel }
    >({
      query: (userData) => ({
        url: "/update",
        body: userData,
        method: "PUT",
      }),
      invalidatesTags: ["tasks"],
    }),

    /** DELETE */
    removeTaskById: builder.mutation<
      CommonResponse<ResponseWithId>,
      { taskId: string }
    >({
      query: (userData) => ({
        url: "/remove",
        body: userData,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useUpdateTaskByIdMutation,
  useRemoveTaskByIdMutation,
} = taskApi;
