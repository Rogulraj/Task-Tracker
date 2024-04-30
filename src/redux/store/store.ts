import { taskReducer } from "@redux/features/task.feature";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
  reducer: {
    task: taskReducer,
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware();
  },
});

export default store;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
