import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AddTodoModal from './AddTodoModal';
import EditTodoModal from './EditTodoModal';
import DeleteTodoModal from './DeleteTodoModal';
import mockData from '../data/mockData';

const { Column } = Table;

const TodoTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [sortOrder, setSortOrder] = useState({});

    useEffect(() => {
        setData(mockData);
        setLoading(false);
    }, []);

    const handleAddModalOpen = () => {
        setAddModalVisible(true);
    };

    const handleAddModalClose = () => {
        setAddModalVisible(false);
    };

    const handleAddModalSubmit = (values) => {
        const newData = [
            ...data,
            {
                ...values,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
                status: 'OPEN',
            },
        ];
        setData(newData);
        setAddModalVisible(false);
    };

    const handleEditModalOpen = (record) => {
        setSelectedTodo(record);
        setEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setSelectedTodo(null);
        setEditModalVisible(false);
    };

    const handleEditModalSubmit = (values) => {
        const newData = data.map((item) => {
            if (item.key === selectedTodo.key) {
                return {
                    ...item,
                    ...values,
                };
            }
            return item;
        });
        setData(newData);
        setSelectedTodo(null);
        setEditModalVisible(false);
    };

    const handleDeleteModalOpen = (record) => {
        setSelectedTodo(record);
        setDeleteModalVisible(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedTodo(null);
        setDeleteModalVisible(false);
    };

    const handleDeleteModalSubmit = () => {
        const newData = data.filter((item) => item.key !== selectedTodo.key);
        setData(newData);
        setSelectedTodo(null);
        setDeleteModalVisible(false);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setSortOrder(sorter);
    };

    const sortTable = (a, b, sorter) => {
        if (sorter.order === 'ascend') {
            return a[sorter.field].localeCompare(b[sorter.field]);
        } else if (sorter.order === 'descend') {
            return b[sorter.field].localeCompare(a[sorter.field]);
        }
        return 0;
    };

    const getTagColors = (status) => {
        switch (status) {
            case 'OPEN':
                return 'blue';
            case 'WORKING':
                return 'orange';
            case 'DONE':
                return 'green';
            case 'OVERDUE':
                return 'red';
            default:
                return '';
        }
    };

    const filteredData = data.filter(
        (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase()) ||
            item.tag.toLowerCase().includes(searchText.toLowerCase())
    );
};

export default TodoTable;
