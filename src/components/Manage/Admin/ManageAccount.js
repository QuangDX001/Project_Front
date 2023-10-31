import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import TableAccPaginate from './TableAccPaginate'
import { getCombineUsers } from '../../../services/apiServices'
import "./ManageTable.scss"

const ManageAccount = (pros) => {
    const PAGE_LIMIT = 1

    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")

    const [listUser, setListUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // const debouncedSearchTerm = useDebounce()

    const fetchListUser = async (page, size, sortBy, sortDir) => {
        try {
            setIsLoading(true)
            let res = await getCombineUsers(page, 10, sortBy, sortDir)
            console.log("Users: ", res)
            if (res.status === 200) {
                setListUser(res.data.content)
                setPageCount(res.data.totalPages)
            }
        } catch (e) {
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let data = await fetchListUser(currentPage, PAGE_LIMIT, sortBy, sortDir)
        }

        fetchData()
    }, [sortBy, sortDir, currentPage])

    const handleClickOrder = (e) => {
        setSortDir(e.target.value)
        setCurrentPage(1)
    }

    const handleClickFilter = (e) => {
        setSortBy(e.target.value)
        setCurrentPage(1)
    }


    return (
        <div className="manage-container p-3">
            <div className="title d-flex justify-content-center">
                <h1>Manage Account</h1>
            </div>
            <div className="user-content mt-3">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                        <Form.Select
                            aria-label="Default select example"
                            value={sortDir}
                            onChange={(e) => handleClickOrder(e)}
                        >
                            <option value="asc">Ascending order</option>
                            <option value="desc">Descending order</option>
                        </Form.Select>
                    </div>
                    <div className="">
                        <Form.Select
                            aria-label="Default select example"
                            value={sortBy}
                            onChange={(e) => handleClickFilter(e)}
                        >
                            <option value="id">By ID</option>
                            <option value="username">By Name</option>
                        </Form.Select>
                    </div>
                </div>
                <div className="table-user mt-3">
                    {isLoading ? (
                        "Loading..."
                    ) : (
                        <TableAccPaginate
                            listUser={listUser}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            sortBy={sortBy}
                            sortDir={sortDir}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default ManageAccount