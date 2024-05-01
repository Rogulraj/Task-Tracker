// packages
import React, { FC, useState } from "react";

// css
import ds from "./TaskCard.module.css";
import { TaskListItem, taskActions } from "@redux/features/task.feature";

// icons
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import UpdateTaskModalForm from "@components/ModalForms/UpdateTaskModalForm/UpdateTaskModalForm";
import WarningModal from "@components/Modals/WarningModal/WarningModal";
import { useAppDispatch } from "@redux/store/store";
import { toast } from "sonner";
import { TaskModel } from "@models/task.model";
import { useRemoveTaskByIdMutation } from "@services/task.service";

// types
interface TaskCardPropsType {
  taskItem: TaskModel;
}

const TaskCard: FC<TaskCardPropsType> = ({ taskItem }) => {
  const [showUpdateModal, setUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const [RemoveTask] = useRemoveTaskByIdMutation();

  const handleDeleteOk = async (): Promise<void> => {
    try {
      // dispatch(taskActions.removeTask({ id: taskItem.id }));

      await RemoveTask({ taskId: taskItem._id as string });
      toast.success("Task Deleted");
    } catch (error) {
      toast.error("somrthing went wrong!");
    }
  };

  return (
    <div className={ds.main_layout}>
      <div className={ds.dueto_card}>
        <h3 className={ds.dueto_title}>Due:</h3>
        <p className={ds.dueto_value}>{taskItem.dueTo}</p>
      </div>
      <h3 className={ds.task_title}>{taskItem.title}</h3>
      <p className={ds.about_task}>{taskItem.aboutTask}</p>
      <h5 className={ds.tag_title}>Tags</h5>
      <div className={ds.tags_list_container}>
        {taskItem.tags.map((item, index) => (
          <div className={ds.tag_item_card} key={index}>
            <p className={ds.tag_text}>{item}</p>
          </div>
        ))}
      </div>
      <h5 className={ds.tag_title}>Assigned To</h5>
      <div className={ds.tags_list_container}>
        {taskItem.assignedList.map((item, index) => (
          <div className={ds.tag_item_card} key={index}>
            <p className={ds.tag_text}>{item}</p>
          </div>
        ))}
      </div>
      <div className={ds.update_delete_card}>
        <FaEdit
          className={ds.update_icon}
          onClick={() => setUpdateModal(true)}
        />
        <RiDeleteBin5Fill
          className={ds.delete_icon}
          onClick={() => setDeleteModal(true)}
        />
      </div>
      <UpdateTaskModalForm
        taskItem={taskItem}
        isModal={showUpdateModal}
        closeModal={() => setUpdateModal(false)}
      />
      <WarningModal
        isOpen={showDeleteModal}
        closeModal={() => setDeleteModal(false)}
        description="Are you sure?"
        handleSure={handleDeleteOk}
      />
    </div>
  );
};

export default TaskCard;
