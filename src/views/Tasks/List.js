import React, { useEffect, useState } from 'react'
//import axios from 'axios';
import { getAllTask, addTask, deleteTaskById, deleteAllTasks, changeStatusTask, deleteDoneTask, editTaskDone } from '../../services/apiServices'
import AddList from './AddList';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.scss";

const List = () => {
    const [listTask, setListTask] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [editTask, setEditTask] = useState({});
    let isEmptyObj = Object.keys(editTask).length === 0;
    //console.log(isEmptyObj)

    useEffect(() => {
        const fetchList = async () => {
            try {
                setIsLoading(false);
                let res = await getAllTask()
                console.log("Data: ", res)
                if (res.status === 200) {
                    setListTask(res.data)
                }
            } catch (err) {
            } finally {
                setIsLoading(false)
            }
        }
        // setTimeout(() => {
        //     fetchList()
        // }, 3000)

        fetchList()

    }, [])

    const filteredTasks = filter === 'all'
        ? listTask
        : filter === 'completed'
            ? listTask.filter((task) => task.done)
            : listTask.filter((task) => !task.done);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    const handleAddTask = async (title) => {
        let res = await addTask(title)
        console.log(res)
        const addedTask = res.data
        setListTask([...filteredTasks, addedTask])

        if (res.status === 200) {
            toast.success("Add successfully")
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteTask = async (taskId) => {
        let res = await deleteTaskById(taskId)
        const currentTask = listTask.filter(item => item.id !== taskId)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setListTask(currentTask)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteDoneTask = async () => {
        let res = await deleteDoneTask()
        const currentTask = listTask.filter(item => item.done === false)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setListTask(currentTask)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteAllTask = async () => {
        let res = await deleteAllTasks()
        if (res.status === 200) {
            toast.success('Delete successfully')
            setListTask([])
        } else {
            toast.error("Something is wrong")
        }
    }

    const checkDoneTask = async (taskId) => {
        let res = await changeStatusTask(taskId)
        if (res.status === 200) {
            const updatedTasks = listTask.map(item =>
                (item.id === taskId ? { ...item, done: !item.done } : item))
            setListTask(updatedTasks)

        } else {
            toast.error("Something is wrong")
        }
    }

    const handleEditTask = (task) => {
        setEditTask(task)
        //console.log(task)
    }

    const handleCancelEditTask = (task) => {
        setEditTask(task)
    }

    const handleOnChangeTitle = (event) => {
        const editTitle = { ...editTask, title: event.target.value }
        setEditTask(editTitle)
    }

    // const handleEditTaskDone = async (task) => {
    //     // let isEmptyObj = Object.keys(editTask).length === 0;
    //     if (editTask.id === task.id) {
    //         try {
    //             let res = await editTaskDone(task.id)
    //             //console.log(res.data.id)
    //             if (res.status === 200) {

    //                 const editTaskClone = listTask.map((item) =>
    //                     item.id === task.id ? { ...item, title: task.title } : item)
    //                 // let editTaskClone = [...listTask]
    //                 // let objIndex = editTaskClone.findIndex((item) => item.id === task.id)

    //                 // editTaskClone[objIndex].title = editTask.title

    //                 // const editedTask = await res.json();


    //                 setListTask(editTaskClone)
    //                 setEditTask({})
    //                 toast.success("Edit successfully")
    //             } else {
    //                 toast.error("Something is wrong")
    //             }
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     } else {
    //         setEditTask(task)
    //     }

    // }


    const handleEditTaskDone = async (task) => {
        if (editTask.id === task.id) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/tasks/updateTask/${task.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                    },
                    body: JSON.stringify({ title: editTask.title }),
                });
                //console.log(response.json());
                if (response.ok) {
                    const editedTask = await response.json();
                    console.log(editedTask)
                    // Update the listTask state with the edited task
                    const updatedListTask = listTask.map((item) =>
                        item.id === editedTask.id ? editedTask : item
                    );
                    toast.success("Edit successfully")
                    setListTask(updatedListTask);
                    setEditTask({});
                    // You can perform other actions here like displaying a success message
                } else {
                    // Handle error response from the API
                    toast.error('Failed to update task.');
                }
            } catch (error) {
                console.error(error);
                // Handle network error
            }
        } else {
            setEditTask(task);
        }
    };

    return (
        <>
            <div className="tasks-container">
                <AddList
                    onAddTask={handleAddTask}
                />
                <div className="filter-list-todo">
                    <div>Task List</div>
                    <div>
                        <button onClick={() => handleFilterChange('all')}>All</button>
                        <button onClick={() => handleFilterChange('completed')}>Completed</button>
                        <button onClick={() => handleFilterChange('incomplete')}>Incomplete</button>
                    </div>
                </div>
                <div className="list-todo">
                    {isLoading === true ? (
                        <>
                            <div className="mt-3 py-3 d-flex justify-content-center">
                                <h3>Đang tải dữ liệu...</h3>
                            </div>
                        </>
                    ) : (isLoading === false && filteredTasks && filteredTasks.length > 0 &&
                        filteredTasks.map((task) => {
                            return (
                                <div key={task.id} className='list-todo-item' >
                                    {isEmptyObj === true ? (
                                        <>
                                            <span className={task.done ? "completed" : "incomplete"}>
                                                {task.title}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {editTask.id === task.id ? (
                                                <span>
                                                    <input
                                                        type="text"
                                                        value={editTask.title}
                                                        onChange={handleOnChangeTitle}
                                                    />
                                                </span>
                                            ) : (
                                                <span className={task.done ? "completed" : "incomplete"}>
                                                    {task.title}
                                                </span>
                                            )}
                                        </>
                                    )}
                                    <></>
                                    {isEmptyObj === false && editTask.id === task.id ? (
                                        <span className="actions">
                                            {/* edit task */}
                                            <span className="edits">
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={() => handleEditTaskDone(task)}
                                                >
                                                    Save
                                                </button>
                                            </span>
                                            {/* cancel editing task */}
                                            <span className="cancel">
                                                <button
                                                    type="button"
                                                    className="btn"
                                                    onClick={handleCancelEditTask}
                                                >
                                                    Cancel
                                                </button>
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="actions">
                                            {/* {!task.done && */}
                                            <span className="checkboxes">
                                                <input
                                                    type="checkbox"
                                                    checked={task.done ? "checked" : ""}
                                                    onChange={() => checkDoneTask(task.id)}
                                                />
                                            </span>
                                            {/* } */}
                                            <span
                                                className="edit"
                                                onClick={() => handleEditTask(task)}
                                            >
                                                <i className="fas fa-pen"></i>
                                            </span>
                                            <span
                                                className="delete"
                                                onClick={() => handleDeleteTask(task.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </span>
                                        </span>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
                <div className="deletions">
                    <span>
                        <button type="button" onClick={handleDeleteDoneTask}>
                            Delete done task
                        </button>
                    </span>
                    <span>
                        <button type="button" onClick={handleDeleteAllTask}>
                            Delete all task
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default List