import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTask, deleteAllTasks, deleteDoneTask, getAllTask } from '../../services/apiServices'
import { useEffect } from 'react'
import TableTaskList from './TableTaskList'
import './Task.scss'
import { toast } from 'react-toastify'
import AddList from './AddList'
import { Navigate } from 'react-router-dom'

const ListTaskv2 = () => {

    const PAGE_LIMIT = 5

    const [listTask, setListTask] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const account = useSelector((state) => state.user.account)
    const userId = account.id

    const fetchAPI = async (pageNo) => {
        setLoading(true)

        try {
            let res = await getAllTask(pageNo, PAGE_LIMIT, userId)
            console.log(res)

            if (res.status === 200) {
                setListTask(res.data.list)
                setPageCount(res.data.allPages)
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI(currentPage)
    }, [currentPage])

    const filteredTasks = filter === 'all'
        ? listTask
        : filter === 'completed'
            ? listTask.filter((list) => list.done)
            : listTask.filter((list) => !list.done);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
        setCurrentPage(1);
    }

    const handleDeleteDoneTask = async () => {
        let res = await deleteDoneTask(userId)
        const currentTask = listTask.filter(item => item.done === false)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setListTask(currentTask)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteAllTask = async () => {
        let res = await deleteAllTasks(userId)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setListTask([])
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleAddTask = async (title) => {
        let res = await addTask(title)
        console.log(res)
        //const addedTasks = res.data
        //setListTask([...filteredTasks, addedTasks])

        if (res.status === 200) {
            setCurrentPage(1)
            fetchAPI(currentPage)
            toast.success('Add successfully')
        } else {
            Object.values(res.data.detailedMessages).map((item, index) => {
                toast.error(item)
            })
        }
    }

    const msg = "Simple tasks"
    return (
        <div className="p-3 tasks-container">
            <div className="d-flex justify-content-center my-2">
                <h3
                    style={{
                        color: "red",
                    }}
                >
                    {msg} of {account.username}
                </h3>
            </div>
            <div>
                <AddList
                    onAddTask={handleAddTask}
                />
            </div>
            <div className="filter-list-todo">
                <div className="d-flex gap-3 mb-3">
                    <button
                        className={`button ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`button ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => handleFilterChange("completed")}
                    >
                        Completed
                    </button>
                    <button
                        className={`button ${filter === 'incomplete' ? 'active' : ''}`}
                        onClick={() => handleFilterChange("incomplete")}
                    >
                        Incomplete
                    </button>
                </div>
            </div>

            <div className='list-todo'>
                {!loading ? (
                    <TableTaskList
                        listTask={filteredTasks}
                        setCurrentPage={setCurrentPage}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setListTask={setListTask}
                        fetchAPI={fetchAPI}
                    />
                ) : (
                    <>
                        <div className="d-flex justify-content-center">
                            Loading ...
                        </div>
                    </>
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
    )
}

export default ListTaskv2