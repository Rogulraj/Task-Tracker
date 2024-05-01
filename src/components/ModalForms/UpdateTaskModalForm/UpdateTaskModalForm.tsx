// packages
import React, { FC, useEffect, useRef } from "react";
import Modal from "react-modal";

// css
import ds from "./UpdateTaskModalForm.module.css";
import { IoClose } from "react-icons/io5";
import UpdateTaskForm from "@components/Forms/UpdateTaskForm/UpdateTaskForm";
import { TaskListItem } from "@redux/features/task.feature";
import { TaskModel } from "@models/task.model";

// types
interface UpdateTaskModalFormPropsType {
  isModal: boolean;
  closeModal: () => void;
  taskItem: TaskModel;
}

const UpdateTaskModalForm: FC<UpdateTaskModalFormPropsType> = ({
  closeModal,
  isModal,
  taskItem,
}) => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={isModal}
      onRequestClose={() => closeModal()}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "30px",
          backgroundColor: "#fff",
        },
        overlay: { backgroundColor: "rgba(0, 0, 0, .5)" },
      }}
      contentLabel="Form Modal"
      ariaHideApp={false}>
      <div className={ds.main_layout}>
        <div className={ds.title_card}>
          <h4 className={ds.title}>New Task</h4>
          <IoClose className={ds.close_icon} onClick={() => closeModal()} />
        </div>
        <UpdateTaskForm closeModal={closeModal} taskItem={taskItem} />
      </div>
    </Modal>
  );
};

export default UpdateTaskModalForm;
