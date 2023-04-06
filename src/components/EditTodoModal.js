import React, { useState, useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";

const { Option } = Select;

const EditModal = ({ visible, onOk, onCancel, todo }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      status: todo.status,
      tags: todo.tags,
    });
  }, [form, todo]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onOk({ ...values, id: todo.id });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal visible={visible} title="Edit To Do" onOk={handleOk} onCancel={onCancel}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title of the to do item!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the description of the to do item!" },
            { max: 1000, message: "Description cannot be longer than 1000 characters!" },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} placeholder="Select due date" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select the status of the to do item!" }]}
        >
          <Select placeholder="Select a status">
            <Option value="OPEN">Open</Option>
            <Option value="WORKING">Working</Option>
            <Option value="DONE">Done</Option>
            <Option value="OVERDUE">Overdue</Option>
          </Select>
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Enter tags separated by commas" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
