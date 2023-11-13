import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { changeStatusTask, deleteTaskById, editTaskDone } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { Draggable } from 'react-beautiful-dnd';

const TableTaskList = (pros) => {

    const { listTask, pageCount, setCurrentPage, droppableProvided } = pros
    const [editTask, setEditTask] = useState({});
    let isEmptyObj = Object.keys(editTask).length === 0;

    const account = useSelector((state) => state.user.account)
    const userId = account.id

    const handlePageClick = async (event) => {
        await setCurrentPage(event.selected + 1);
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

    const checkDoneTask = async (taskId) => {
        let res = await changeStatusTask(taskId)
        if (res.status === 200) {
            const updatedTasks = listTask.map(item =>
                (item.id === taskId ? { ...item, done: !item.done } : item))
            pros.setListTask(updatedTasks)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteTask = async (taskId) => {
        let res = await deleteTaskById(taskId, userId)
        const currentTask = listTask.filter(item => item.id !== taskId)
        if (res.status === 200) {
            toast.success('Delete successfully')
            pros.setListTask(currentTask)
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
                    pros.setListTask(updatedListTask)
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

    return (
        <>
            <ul className="tasks" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                {listTask && listTask.length > 0 &&
                    listTask.map((task, i) => {
                        return (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={i}>
                                {(providedDraggable) => (
                                    <li ref={providedDraggable.innerRef} {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps} key={i}>
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
                                    </li>
                                )}
                            </Draggable>
                        )
                    })
                }
                {listTask && listTask.length === 0 && (
                    <h1 className="d-flex justify-content-center">No tasks available</h1>
                )}
                {droppableProvided.placeholder}
            </ul>
            <div className="mt-3 d-flex justify-content-center text-center">
                <ReactPaginate
                    nextLabel="Next page>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<Previous page"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={pros.currentPage - 1}
                />
            </div>
        </>
    )
}

export default TableTaskList