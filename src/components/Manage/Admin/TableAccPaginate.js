import React from 'react'
import ReactPaginate from 'react-paginate'
import { FiMinusCircle, FiMenu } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const TableAccPaginate = (pros) => {
    const { listUser, pageCount, sortBy, sortDir } = pros
    const handlePageClick = async (event) => {
        pros.setCurrentPage(event.selected + 1)
        await pros.fetchListUser(event.selected + 1, 1, sortBy, sortDir)
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.roles}</td>

                                    <th className="actions">
                                        <button
                                            className="btn btn-danger"

                                        >
                                            <FiMinusCircle />
                                        </button>
                                        <button
                                            className="btn btn-warning"
                                        //onClick={() => pros.handleClickUpdate(true, item)}
                                        >
                                            <FiMenu />
                                        </button>
                                    </th>
                                </tr>

                            )
                        })}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan={4}>Hiện không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-3 d-flex justify-content-center text-center">
                <ReactPaginate
                    nextLabel="Next Page>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<Previous Page"
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

export default TableAccPaginate