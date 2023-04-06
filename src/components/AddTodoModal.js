import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

const AddTodoModal = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      onOk({
        created: moment().format('YYYY-MM-DD HH:mm:ss'),
        ...values,
      });
      form.resetFields();
    } catch (error) {
      console.log('Validation error', error);
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Add To-Do Item"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Title is required' },
            { max: 100, message: 'Title should be less than 100 characters' },
          ]}
        >
          <Input placeholder="Enter the title of the to-do item" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Description is required' },
            { max: 1000, message: 'Description should be less than 1000 characters' },
          ]}
        >
          <Input.TextArea placeholder="Enter the description of the to-do item" />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker showTime />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Enter tags for the to-do item" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTodoModal;
