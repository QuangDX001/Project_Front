import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { changeStatusTask, editTaskDone } from '../../../services/apiServices'
import { toast } from 'react-toastify'

const ManageTable = (pros) => {
    const { listTask, pageCount, setCurrentPage, fetchAPI } = pros
    const [editTask, setEditTask] = useState({});
    let isEmptyObj = Object.keys(editTask).length === 0;

    const handlePageClick = async (event) => {
        setCurrentPage(event.selected + 1);
        await fetchAPI(event.selected + 1, 1)
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
            fetchAPI(pros.currentPage)
            setCurrentPage(1)
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
            {listTask && listTask.length > 0 &&
                listTask.map((e, i) => {
                    return (
                        <ul className="list-group list-group-horizontal rounded-0 bg-transparent" key={i}>
                            {isEmptyObj === true ? (
                                <>
                                    <li
                                        className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input me-0"
                                                type="checkbox" id="flexCheckChecked2"
                                                checked={e.done ? "checked" : ""}
                                                onChange={() => checkDoneTask(e.id)}
                                                aria-label="..." />
                                        </div>
                                    </li>
                                    <li
                                        className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                        <p className={`${e.done ? "completed line-through" : "incomplete"} lead fw-normal mb-0`}>{e.title}</p>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {editTask.id === e.id ? (
                                        <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                            <input
                                                className='lead fw-normal mb-0 bg-light w-100 ms-n2 ps-2 py-1 rounded'
                                                value={editTask.title}
                                                onChange={handleOnChangeTitle}
                                            />
                                        </li>
                                    ) : (
                                        <li
                                            className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                            <p className={`${e.done ? "completed line-through" : "incomplete"} lead fw-normal mb-0`}>{e.title}</p>
                                        </li>
                                    )}
                                </>
                            )}
                            <></>
                            {isEmptyObj === false && editTask.id === e.id ? (

                                <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                    <div className="d-flex flex-row justify-content-end mb-1">
                                        <span onClick={() => handleEditTaskDone(e.id)} className="text-info" data-mdb-toggle="tooltip" title="Save edit"><i
                                            className='fas fa-save me-3'></i></span>
                                        <span onClick={handleCancelEditTask} className="text-danger" data-mdb-toggle="tooltip" title="Cancel todo"><i
                                            className='fas fa-backspace'></i></span>
                                    </div>

                                    <div className="text-end text-muted">
                                        <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created by">
                                            <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>Created By: {e.username}</p>
                                        </a>
                                    </div>
                                </li>
                            ) : (
                                <>
                                    <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                        {/* <div className="d-flex flex-row justify-content-end mb-1">
                                            <span onClick={() => handleEditTask(e)} className="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
                                                className="fas fa-pencil-alt"></i></span>
                                        </div> */}
                                        <div className="text-end text-muted">
                                            <a href="#!" className="text-muted" data-mdb-toggle="tooltip" title="Created by">
                                                <p className="small mb-0"><i className="fas fa-info-circle me-2"></i>Created By: {e.username}</p>
                                            </a>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    )
                })
            }
            {listTask && listTask.length === 0 && (
                <h1 className="d-flex justify-content-center">No tasks available</h1>
            )}
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

export default ManageTable