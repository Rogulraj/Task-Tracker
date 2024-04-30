// packages
import React, { FC, useEffect, useRef } from "react";
import Modal from "react-modal";

// css
import ds from "./CreateTaskModalForm.module.css";
import { IoClose } from "react-icons/io5";
import CreateTaskForm from "@components/Forms/CreateTaskForm/CreateTaskForm";

// types
interface CreateTaskModalFormPropsType {
  isModal: boolean;
  closeModal: () => void;
}

const CreateTaskModalForm: FC<CreateTaskModalFormPropsType> = ({
  closeModal,
  isModal,
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
        <CreateTaskForm closeModal={closeModal} />
      </div>
    </Modal>
  );
};

export default CreateTaskModalForm;
