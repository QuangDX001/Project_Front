import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import '../Task.scss'
import { useState } from 'react';
import { addSubTask, changeStatusSubTask, deleteSubTaskById, editSubTaskDone } from '../../../services/apiServices';
import { toast } from 'react-toastify';


const TableSubtaskList = (props) => {

    const { subtasks, providedDroppable } = props
    const [editTask, setEditTask] = useState({});
    const [newSubTaskTitle, setNewSubTaskTitle] = useState(''); // New state for the input field

    const sortedList = [...subtasks].sort((a, b) => a.position - b.position)

    let isEmptyObj = Object.keys(editTask).length === 0;

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
        let res = await changeStatusSubTask(taskId)
        if (res.status === 200) {
            // console.log("Check res >>> ", res)
            const updatedSubtasks = sortedList.map((subtask) =>
                subtask.id === taskId ? { ...subtask, done: !subtask.done } : subtask
            );
            props.setSortedList((prevList) =>
                prevList.map((task) =>
                    task.id === res.data.primaryTask
                        ? { ...task, subTasks: updatedSubtasks }
                        : task
                )
            );
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteTask = async (taskId) => {
        let res = await deleteSubTaskById(taskId)
        const currentTask = sortedList.filter(item => item.id !== taskId)
        if (res.status === 200) {
            console.log("Check res >>> ", res)
            toast.success('Delete successfully')
            props.setSortedList((prevList) =>
                prevList.map((task) =>
                    task.id === res.data
                        ? { ...task, subTasks: currentTask }
                        : task
                )
            );
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleEditTaskDone = async (taskId) => {
        // let isEmptyObj = Object.keys(editTask).length === 0;
        if (editTask.id === taskId) {
            try {
                let res = await editSubTaskDone(taskId, editTask.title)

                if (res.status === 200) {
                    //console.log("Check res >>>  ", res)

                    //console.log("Check task >> ", editTask)
                    const updatedListTask = sortedList.map((item) =>
                        item.id === res.data.id ? res.data : item
                    );
                    props.setSortedList((prevList) =>
                        prevList.map((task) =>
                            task.id === res.data.primaryTask
                                ? { ...task, subTasks: updatedListTask }
                                : task
                        )
                    );
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

    const handleAddSubTask = async () => {
        try {
            let res = await addSubTask(newSubTaskTitle, props.primaryTaskId);
            console.log("Check res >>> ", res);

            if (res.status === 200) {
                const updatedSubtasks = [res.data, ...subtasks];
                props.setSortedList((prevList) =>
                    prevList.map((task) =>
                        task.id === res.data.taskId
                            ? { ...task, subTasks: updatedSubtasks }
                            : task
                    )
                )
                setNewSubTaskTitle('');
                toast.success('Add successfully')
            } else {
                Object.values(res.data.detailedMessages).map((item, index) => {
                    toast.error(item)
                })
            }
        } catch (error) {
            console.log("Something goes wrong", error)
        }
    }

    return (
        <ul className="subtasks">
            {/* Input field for adding a new subtask */}
            {props.newSubTaskVisible && (
                <li className="subtasks-item" style={{ "border": 0 }}>
                    <input
                        type="text"
                        placeholder="Add a new subtask..."
                        value={newSubTaskTitle}
                        onChange={(e) => setNewSubTaskTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubTask()}
                    />
                </li>
            )}

            {/* Existing subtasks */}
            {sortedList.map((subtask) => (
                <li key={subtask.id} className='subtasks-item'>
                    {isEmptyObj === true ? (
                        <>
                            <span className={subtask.done ? "completed" : "incomplete"} onClick={() => checkDoneTask(subtask.id)}>
                                {subtask.title}
                            </span>
                        </>
                    ) : (
                        <>
                            {editTask.id === subtask.id ? (
                                <span>
                                    <input
                                        type='text'
                                        value={editTask.title}
                                        onChange={handleOnChangeTitle}
                                    />
                                </span>
                            ) : (
                                <>
                                    <span className={subtask.done ? "completed" : "incomplete"} onClick={() => checkDoneTask(subtask.id)}>
                                        {subtask.title}
                                    </span>

                                </>
                            )}
                        </>
                    )}
                    <></>
                    {isEmptyObj === false && editTask.id === subtask.id ? (
                        <span className="actions">
                            {/* edit task */}
                            <span className="save" onClick={() => handleEditTaskDone(subtask.id)}>
                                <i className='fas fa-save me-3'></i>
                            </span>
                            {/* cancel editing task */}
                            <span className="cancel" onClick={handleCancelEditTask}>
                                <i className='fas fa-backspace'></i>
                            </span>
                        </span>
                    ) : (
                        <span className='actions'>
                            <span
                                className="edit"
                                onClick={() => handleEditTask(subtask)}
                            >
                                <i className="fas fa-pen"></i>
                            </span>
                            <span
                                className="delete"
                                onClick={() => handleDeleteTask(subtask.id)}
                            >
                                <i className="fas fa-trash"></i>
                            </span>
                        </span>
                    )}
                </li>
            ))}

            {/* Actions for the new subtask */}
            {/* {newSubTaskTitle.trim() !== '' && (
                <li className="subtasks-item">
                    <span className="actions">
                        <span className="save" onClick={handleAddSubTask}>
                            <i className="fas fa-save me-3"></i>
                        </span>
                        <span className="cancel" onClick={() => setNewSubTaskTitle('')}>
                            <i className="fas fa-backspace"></i>
                        </span>
                    </span>
                </li>
            )} */}
        </ul>
    );
};

export default TableSubtaskList;
