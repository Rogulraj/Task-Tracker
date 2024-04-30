// packages
import React, { FC, FormEvent, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import * as Yup from "yup";

// css
import ds from "./CreateTaskForm.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SelectInput from "@components/Elements/SelectInput/SelectInput";
import { taskStatusList } from "@constants/taskStatus";
import { YupFormValidator } from "@utils/yupFormValidator";
import { toast } from "sonner";
import PrimaryButton from "@components/Elements/Buttons/PrimaryButton/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@redux/store/store";
import { TaskListItem, taskActions } from "@redux/features/task.feature";

// types
interface CreateTaskFormPropsType {
  closeModal?: () => void;
}

const yupValidationSchema = Yup.object({
  title: Yup.string().required("Enter title"),
  dueTo: Yup.string().required("Select Date"),
  tags: Yup.array()
    .of(Yup.string().required("Add Tags"))
    .min(1, "Add atleast one tag"),
  assignedList: Yup.array()
    .of(Yup.string().required("Add User"))
    .min(1, "Add atleast one user"),
  status: Yup.string().required("Please select status"),
  aboutTask: Yup.string()
    .required("Enter about task")
    .min(10, "use atleast 10 characters"),
});

const CreateTaskForm: FC<CreateTaskFormPropsType> = ({ closeModal }) => {
  const [title, setTitle] = useState<string>("");
  const [dueTo, setDueTo] = useState<Dayjs | null>(dayjs());
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [assignedList, setAssignedList] = useState<string[]>([]);
  const [assignedText, setAssignedText] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [aboutTask, setAboutTask] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { taskList } = useAppSelector((state) => state.task);

  console.log("taskList", taskList);

  const addTags = (tag: string) => {
    const index = tags.findIndex((item) => item === tag);
    if (index === -1 && tag.length > 0) {
      setTags([...tags, tag]);
      setTag("");
    }
  };

  const removeTags = (val: string) => {
    const newList = tags.filter((item) => item !== val);
    setTags(newList);
  };

  const addUser = (val: string) => {
    const index = assignedList.findIndex((item) => item === val);
    if (index === -1 && val.length > 0) {
      setAssignedList([...assignedList, val]);
      setAssignedText("");
    }
  };

  const removeUser = (val: string) => {
    const newList = assignedList.filter((item) => item !== val);
    setAssignedList(newList);
  };

  const validationErrorSetter = (errors: string[]) => {
    setValidationErrors(errors);
  };

  const handleFormSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      const validationData = {
        title,
        dueTo: dueTo?.format("MM/DD/YYYY"),
        aboutTask,
        status,
        tags,
        assignedList,
      };
      const yupValidation = new YupFormValidator(
        yupValidationSchema,
        validationData,
        validationErrorSetter
      );
      const validate = await yupValidation.validate();
      toast.success("validation success!");
      if (validate) {
        dispatch(
          taskActions.addTask({
            ...validationData,
            id: crypto.randomUUID(),
          } as TaskListItem)
        );
        if (closeModal) closeModal();
      }
    } catch (error) {
      toast.error("something went wrong!");
    }
  };

  return (
    <form className={ds.form_layout} onSubmit={handleFormSubmit}>
      <div className={ds.input_card}>
        <label htmlFor="title" className={ds.title_label}>
          Title
        </label>
        <input
          name="title"
          id="title"
          type="text"
          placeholder="Enter Title"
          className={ds.title_input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={ds.input_card}>
        <label htmlFor="due-to" className={ds.title_label}>
          Due to
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className={ds.dueto_input}
            value={dueTo}
            onChange={(newValue) => setDueTo(newValue)}
          />
        </LocalizationProvider>
      </div>
      <div className={ds.input_card}>
        <label htmlFor="tags" className={ds.title_label}>
          Tags
        </label>
        <div className={ds.tags_input_card}>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tag"
            id="tags"
            className={ds.tags_input}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <FaPlus
            onClick={() => {
              addTags(tag);
            }}
          />
        </div>
        <div className={ds.tags_list_container}>
          {tags.map((item, index) => (
            <div className={ds.tag_item_card} key={index}>
              <p className={ds.tag_text}>{item}</p>
              <IoClose onClick={() => removeTags(item)} />
            </div>
          ))}
        </div>
      </div>
      <div className={ds.input_card}>
        <label htmlFor="assigned-to" className={ds.title_label}>
          Assigned To
        </label>
        <div className={ds.tags_input_card}>
          <input
            type="text"
            name="assigned-to"
            id="assigned-to"
            placeholder="Enter Username or Team"
            className={ds.tags_input}
            value={assignedText}
            onChange={(e) => setAssignedText(e.target.value)}
          />
          <FaPlus
            onClick={() => {
              addUser(assignedText);
            }}
          />
        </div>
        <div className={ds.tags_list_container}>
          {assignedList.map((item, index) => (
            <div className={ds.tag_item_card} key={index}>
              <p className={ds.tag_text}>{item}</p>
              <IoClose onClick={() => removeUser(item)} />
            </div>
          ))}
        </div>
      </div>
      <div className={ds.input_card}>
        <label htmlFor="status" className={ds.title_label}>
          Status
        </label>
        <div className={ds.select_input_card}>
          <SelectInput
            optionsList={taskStatusList}
            placeHolderText="Select Status"
            selectedValue={status}
            setSelectedValue={(val) => setStatus(val as string)}
          />
        </div>
      </div>
      <div className={ds.input_card}>
        <label htmlFor="about" className={ds.title_label}>
          About Task
        </label>
        <textarea
          name="about"
          id="about"
          placeholder="About Task"
          value={aboutTask}
          onChange={(e) => setAboutTask(e.target.value)}
          className={ds.about_task_input}
        />
      </div>
      {validationErrors.length > 0 ? (
        <p className={ds.validation_error}>*{validationErrors[0]}</p>
      ) : null}
      <PrimaryButton
        title="Submit"
        type="submit"
        variant="fill"
        className={ds.submit_btn}
      />
    </form>
  );
};

export default CreateTaskForm;
