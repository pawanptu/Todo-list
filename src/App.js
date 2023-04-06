import React, { useState } from "react";
import { Layout, PageHeader } from "antd";
import TodoTable from "./components/TodoTable";
import AddTodoModal from "./components/AddTodoModal";
import EditTodoModal from "./components/EditTodoModal";
import DeleteTodoModal from "./components/DeleteTodoModal";
import "./App.css";
import { mockData } from "./data/mockData";

const { Content } = Layout;

const App = () => {
  const [todoList, setTodoList] = useState(mockData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [filteredTodoList, setFilteredTodoList] = useState(mockData);

  const handleAddTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
    setIsAddModalVisible(false);
  };

  const handleEditTodo = (updatedTodo) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.key === updatedTodo.key ? updatedTodo : todo
    );
    setTodoList(updatedTodoList);
    setIsEditModalVisible(false);
  };

  const handleDeleteTodo = (key) => {
    const updatedTodoList = todoList.filter((todo) => todo.key !== key);
    setTodoList(updatedTodoList);
    setIsDeleteModalVisible(false);
  };

  const handleSearch = (searchText) => {
    const filteredList = todoList.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTodoList(filteredList);
  };

  return (
    <Layout className="layout">
      <PageHeader className="site-page-header" title="Todo List" />
      <Content className="content">
        <TodoTable
          todoList={filteredTodoList}
          handleEditTodo={(todo) => {
            setSelectedTodo(todo);
            setIsEditModalVisible(true);
          }}
          handleDeleteTodo={(todo) => {
            setSelectedTodo(todo);
            setIsDeleteModalVisible(true);
          }}
          handleSearch={handleSearch}
          setFilteredTodoList={setFilteredTodoList}
          setTodoList={setTodoList}
        />
      </Content>
      <AddTodoModal
        visible={isAddModalVisible}
        handleOk={handleAddTodo}
        handleCancel={() => setIsAddModalVisible(false)}
      />
      {selectedTodo && (
        <EditTodoModal
          visible={isEditModalVisible}
          todo={selectedTodo}
          handleOk={handleEditTodo}
          handleCancel={() => setIsEditModalVisible(false)}
        />
      )}
      {selectedTodo && (
        <DeleteTodoModal
          visible={isDeleteModalVisible}
          todo={selectedTodo}
          handleOk={() => handleDeleteTodo(selectedTodo.key)}
          handleCancel={() => setIsDeleteModalVisible(false)}
        />
      )}
    </Layout>
  );
};

export default App;
