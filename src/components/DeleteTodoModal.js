import React from 'react';
import { Modal, Typography } from 'antd';

const { Text } = Typography;

const DeleteTodoModal = ({ visible, todo, onDelete, onCancel }) => {
  const handleOk = () => {
    onDelete(todo);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      title={`Delete to-do item "${todo.title}"?`}
      okText="Delete"
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Text>Are you sure you want to delete this item?</Text>
    </Modal>
  );
};

export default DeleteTodoModal;
