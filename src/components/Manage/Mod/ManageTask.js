import React from 'react'
import { useState } from 'react';
import { getAllTask } from '../../../services/apiServices';
import { useEffect } from 'react';
import './Moderator.scss'
import ManageTable from './ManageTable';
import ReactPaginate from 'react-paginate';

const ManageTask = () => {
    const PAGE_LIMIT = 4

    const [listTask, setListTask] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const fetchAPI = async (pageNo) => {
        setLoading(true)

        try {
            let res = await getAllTask(pageNo, PAGE_LIMIT, 0)
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

    const filteredTasks = filter === 'all'
        ? listTask
        : filter === 'completed'
            ? listTask.filter((list) => list.done)
            : listTask.filter((list) => !list.done);

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchAPI(currentPage)
        }

        fetchData()
    }, [currentPage])

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
        setCurrentPage(1);
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col">
                    <div className="card border-0" id="list1" style={{ "backgroundColor": " rgba(245, 230, 215, 0.767)" }}>
                        <div className="card-body py-4 px-4 px-md-5">

                            <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                All Tasks Avaliable
                            </p>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                                <p className="small mb-0 me-2 text-muted">Filter</p>
                                <select className="select" value={filter} onChange={handleFilterChange}>
                                    <option value="all">All</option>
                                    <option value="completed">Completed</option>
                                    <option value="incomplete">Active</option>
                                </select>
                            </div>

                            <div>
                                <>
                                    {!loading ? (
                                        <ManageTable
                                            listTask={filteredTasks}
                                            setListTask={setListTask}
                                            setCurrentPage={setCurrentPage}
                                            pageCount={pageCount}
                                            currentPage={currentPage}
                                            fetchAPI={fetchAPI}
                                        />
                                    ) : (
                                        <>
                                            <div className="d-flex justify-content-center text-center">
                                                Loading ...
                                            </div>
                                        </>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageTask