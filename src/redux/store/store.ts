import { taskReducer } from "@redux/features/task.feature";
import { configureStore } from "@reduxjs/toolkit";
import { taskApi } from "@services/task.service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    task: taskReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(taskApi.middleware);
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
