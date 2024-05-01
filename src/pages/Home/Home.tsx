// packages
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// css
import ds from "./Home.module.css";
import PrimaryHeader from "@components/Headers/PrimaryHeader";
import MaxWidthLayout from "@components/Layout/MaxWidthLayout/MaxWidthLayout";
import TotalTaskStatus from "@components/Cards/TotalTaskStatus/TotalTaskStatus";

import { FaCalendarAlt } from "react-icons/fa";
import { ThemeProvider, createTheme } from "@mui/material";
import PrimaryButton from "@components/Elements/Buttons/PrimaryButton/PrimaryButton";
import { TaskStatusType, taskStatusList } from "@constants/taskStatus";
import { isTaskStatus } from "@helper/taskStatusFinder";
import TaskStatusListCard from "@components/Cards/TaskStatusList/TaskStatusListCard";
import { FaPlus } from "react-icons/fa6";
import CreateTaskModalForm from "@components/ModalForms/CreateTaskModalForm/CreateTaskModalForm";
import { useAppSelector } from "@redux/store/store";
import { useGetAllTasksQuery } from "@services/task.service";
import { TaskModel } from "@models/task.model";
import CustomHelmet from "@components/Elements/CustomHelmet/CustomHelmet";

// types
interface HomePropsType {}

interface TodaysTasks {
  todo: number;
  inProgress: number;
  completed: number;
}

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3651d9",
    },
  },
};

const theme = createTheme(themeOptions);

const Home: FC<HomePropsType> = ({}) => {
  /** states */
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(dayjs());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatusType[]>([
    "Todo",
    "In Progress",
    "Completed",
  ]);
  const [showCreateTaskModal, setCreateTaskModal] = useState<boolean>(false);

  const [todaysTasks, setTodaysTasks] = useState<TodaysTasks>({
    todo: 0,
    completed: 0,
    inProgress: 0,
  });

  // const { taskList } = useAppSelector((state) => state.task);

  const { data: taskData } = useGetAllTasksQuery("");
  const taskList: TaskModel[] = useMemo(() => {
    return taskData?.data || [];
  }, [taskData]);
  // console.log(taskList1?.data, taskListError1);

  /** useCallback Methods */
  const isStatus = useCallback(
    (val: TaskStatusType) => {
      return isTaskStatus(selectedStatus, val);
    },
    [selectedStatus]
  );

  const addSelectedStatus = useCallback(
    (val: TaskStatusType) => {
      const index = selectedStatus.findIndex((item) => item === val);
      if (index === -1) {
        setSelectedStatus((prev) => [...prev, val]);
      } else {
        setSelectedStatus((prev) => prev.filter((item) => item !== val));
      }
    },
    [selectedStatus]
  );

  useEffect(() => {
    const today = selectedDate.startOf("day"); // Get the start of today

    const filteredTasks = taskList.filter((task) => {
      const dueDate = dayjs(task.dueTo, "MM/DD/YYYY").startOf("day"); // Get the start of the task's due date
      return dueDate.isSame(today, "day"); // Check if the task's due date is the same as today
    });

    // Count tasks by status
    let todoCount = 0;
    let inProgressCount = 0;
    let completedCount = 0;

    filteredTasks.forEach((task) => {
      switch (task.status) {
        case "Todo":
          todoCount++;
          break;
        case "In Progress":
          inProgressCount++;
          break;
        case "Completed":
          completedCount++;
          break;
        default:
          break;
      }
    });

    // Update state
    setTodaysTasks({
      todo: todoCount,
      inProgress: inProgressCount,
      completed: completedCount,
    });
  }, [taskList, selectedDate]);

  return (
    <div className={ds.main_layout}>
      <CustomHelmet title="DashBoard" />
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={ds.text_content_container}>
          <div className={ds.content_calender_card}>
            <div className={ds.content_wrapper}>
              <h1 className={ds.greeting_text}>Hello Rogul 👋</h1>
              <div className={ds.task_overview_card}>
                <div className={ds.sm_calender_card}>
                  <h3 className={ds.task_overview_title}>
                    <span className={ds.selected_date_text}>
                      {selectedDate.format("DD-MM-YYYY")}
                    </span>{" "}
                    you have
                  </h3>
                  <FaCalendarAlt
                    color="#fff"
                    size={20}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className={ds.sm_calender_icon}
                  />
                  <div
                    className={ds.sm_calender}
                    style={{ display: showCalendar ? "flex" : "none" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <ThemeProvider theme={theme}>
                        <DateCalendar
                          className={ds.sm_date_picker}
                          value={selectedDate}
                          onChange={(newValue) => setSelectedDate(newValue)}
                        />
                      </ThemeProvider>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>

              <div className={ds.status_list_card}>
                <TotalTaskStatus
                  taskStatus="Todo"
                  totalTask={todaysTasks.todo}
                />
                <TotalTaskStatus
                  taskStatus="In Progress"
                  totalTask={todaysTasks.inProgress}
                />
                <TotalTaskStatus
                  taskStatus="Completed"
                  totalTask={todaysTasks.completed}
                />
              </div>
            </div>
            <div className={ds.md_calender}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <DateCalendar
                    className={ds.md_date_picker}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                  />
                </ThemeProvider>
              </LocalizationProvider>
            </div>
          </div>

          <h3 className={ds.status_btn_title}>apply filter</h3>
          <div className={ds.status_btn_container}>
            {taskStatusList.map((item, index) => (
              <PrimaryButton
                onClickFn={() => addSelectedStatus(item)}
                key={index}
                title={item}
                type="button"
                style={{
                  backgroundColor: isStatus(item) ? "#3651d9" : "",
                  color: isStatus(item) ? "#fff" : "",
                }}
                variant={isStatus(item) ? "fill" : "outline"}
              />
            ))}
          </div>
          <ul className={ds.task_status_list_container}>
            {selectedStatus.map((item, index) => (
              <li key={index} className={ds.task_status_item_card}>
                <TaskStatusListCard taskStatus={item} />
              </li>
            ))}
          </ul>
          <div
            className={ds.new_task_btn_card}
            onClick={() => setCreateTaskModal(true)}>
            <FaPlus className={ds.plus_icon} />
          </div>
          <CreateTaskModalForm
            isModal={showCreateTaskModal}
            closeModal={() => setCreateTaskModal(false)}
          />
        </div>
      </MaxWidthLayout>
    </div>
  );
};

export default Home;
