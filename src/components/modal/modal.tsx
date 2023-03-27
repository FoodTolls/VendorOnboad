import React, { useState } from "react";
import { Modal } from "antd";
type popupProp = {
  message: string;
};
const Popup = ({ message }: popupProp) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  console.log(message);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {message}
      </Modal>
    </>
  );
};

export default Popup;
