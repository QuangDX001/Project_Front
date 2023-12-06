import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { changeStatusTask, deleteTaskById, editTaskDone } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import TableSubTaskList from './SubTasks/TableSubTaskList';
import { Button } from 'react-bootstrap';

const TableTaskList = (pros) => {

    const { listTask, providedDroppable, setSortedList } = pros;
    const [editTask, setEditTask] = useState({});
    const [taskVisibility, setTaskVisibility] = useState({});
    const [newSubTaskVisible, setNewSubTaskVisible] = useState(false);

    let isEmptyObj = Object.keys(editTask).length === 0;

    const account = useSelector((state) => state.user.account)
    const userId = account.id

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

    const checkDoneTask = async (taskId) => {
        let res = await changeStatusTask(taskId)
        if (res.status === 200) {
            const updatedTasks = listTask.map(item =>
                (item.id === taskId ? { ...item, done: !item.done } : item))
            setSortedList(updatedTasks)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteTask = async (taskId) => {
        let res = await deleteTaskById(taskId, userId)
        const currentTask = listTask.filter(item => item.id !== taskId)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setSortedList(currentTask)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleEditTaskDone = async (taskId) => {
        // let isEmptyObj = Object.keys(editTask).length === 0;
        if (editTask.id === taskId) {
            try {
                let res = await editTaskDone(taskId, editTask.title)

                if (res.status === 200) {
                    console.log("Check res >>>  ", res)

                    //console.log("Check task >> ", editTask)
                    const updatedListTask = listTask.map((item) =>
                        item.id === res.data.id ? res.data : item
                    );
                    setSortedList(updatedListTask)
                    setEditTask({})
                    toast.success("Edit successfully")
                } else {
                    Object.values(res.data.detailedMessages).map((item, index) => {
                        toast.error(item)
                    })
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            setEditTask(editTask)
        }

    }

    const toggleSubtaskVisibility = (taskId) => {

        setTaskVisibility((prevVisibility) => ({
            ...prevVisibility,
            [taskId]: !prevVisibility[taskId],
        }))

        // Check if the task has subtasks
        if (!pros.listTask.find(task => task.id === taskId)?.subTasks?.length) {
            setNewSubTaskVisible(true)
        }
    }

    return (
        <>
            <ul className="tasks" {...providedDroppable.droppableProps}>
                {listTask && listTask.length > 0 &&
                    listTask.map((task, i) => {
                        return (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={i} type="TASK">
                                {(providedDraggable) => {
                                    return (
                                        <li className='tasks-item' ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps} key={i}>
                                            {isEmptyObj === true ? (
                                                <>
                                                    <span className={task.done ? "completed" : "incomplete"} onClick={() => checkDoneTask(task.id)}>
                                                        {task.title}
                                                    </span>
                                                    {/* Render subtasks only if they are visible */}
                                                    {taskVisibility[task.id] && (
                                                        <TableSubTaskList
                                                            subtasks={task.subTasks}
                                                            primaryTaskId={task.id}
                                                            setSortedList={setSortedList}
                                                            newSubTaskVisible={newSubTaskVisible}
                                                        />
                                                    )}
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
                                                        <>
                                                            <span className={task.done ? "completed" : "incomplete"} onClick={() => checkDoneTask(task.id)}>
                                                                {task.title}
                                                            </span>
                                                            {/* Render subtasks only if they are visible */}
                                                            {taskVisibility[task.id] && (
                                                                <TableSubTaskList
                                                                    subtasks={task.subTasks}
                                                                    primaryTaskId={task.id}
                                                                    setSortedList={setSortedList}
                                                                    newSubTaskVisible={newSubTaskVisible}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            <></>
                                            {isEmptyObj === false && editTask.id === task.id ? (
                                                <span className="actions">
                                                    {/* edit task */}
                                                    <span className="save" onClick={() => handleEditTaskDone(task.id)}>
                                                        <i className='fas fa-save me-3'></i>
                                                    </span>
                                                    {/* cancel editing task */}
                                                    <span className="cancel" onClick={handleCancelEditTask}>
                                                        <i className='fas fa-backspace'></i>
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="actions">
                                                    {/* {!task.done && */}
                                                    {/* <span className="checkboxes">
                                                        <input
                                                            type="checkbox"
                                                            checked={task.done ? "checked" : ""}
                                                            onChange={() => checkDoneTask(task.id)}
                                                        />
                                                    </span> */}
                                                    {/* } */}
                                                    <span onClick={() => toggleSubtaskVisibility(task.id)}>
                                                        {(
                                                            taskVisibility[task.id] ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>
                                                        )}
                                                    </span>
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
                                        </li>
                                    )
                                }}
                            </Draggable>
                        )
                    })
                }
                {listTask && listTask.length === 0 && (
                    <h1 className="d-flex justify-content-center">No tasks available</h1>
                )}
                {providedDroppable.placeholder}
            </ul >
        </>
    )
}

export default TableTaskList