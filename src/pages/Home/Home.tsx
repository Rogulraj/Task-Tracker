// packages
import React, { FC, useCallback, useMemo, useState } from "react";

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

// types
interface HomePropsType {}

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
  const [showModifyTaskModal, setShowModifyTaskModal] =
    useState<boolean>(false);

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

  return (
    <div className={ds.main_layout}>
      <PrimaryHeader />
      <MaxWidthLayout>
        <div className={ds.text_content_container}>
          <div className={ds.content_calender_card}>
            <div className={ds.content_wrapper}>
              <h1 className={ds.greeting_text}>Hello Rogul 👋</h1>
              <div className={ds.task_overview_card}>
                <div className={ds.sm_calender_card}>
                  <h3 className={ds.task_overview_title}>Today you have</h3>
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
                <TotalTaskStatus taskStatus="Todo" totalTask={3} />
                <TotalTaskStatus taskStatus="In Progress" totalTask={5} />
                <TotalTaskStatus taskStatus="Completed" totalTask={4} />
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

          <div className={ds.status_btn_container}>
            {taskStatusList.map((item, index) => (
              <PrimaryButton
                onClickFn={() => addSelectedStatus(item)}
                key={index}
                title={item}
                type="button"
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
