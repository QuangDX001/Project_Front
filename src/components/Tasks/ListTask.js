import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTask, deleteAllTasks, deleteDoneTask, getAllTask } from '../../services/apiServices'
import { useEffect } from 'react'
import TableTaskList from './TableTaskList'
import './Task.scss'
import { toast } from 'react-toastify'
import AddList from './AddList'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

const ListTask = () => {

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
        const addedTasks = res.data
        setListTask([...filteredTasks, addedTasks])

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

    // const handleDrag = (result) => {
    //     //console.log(result)
    //     if (!result.destination) return;

    //     const items = Array.from(filteredTasks);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);

    //     setListTask(items);
    // }

    const handleDrag = (result) => {
        //console.log(result)
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // Get the dragged task
        const draggedTask = filteredTasks[sourceIndex];

        // Update the filtered task list without the dragged task
        const updatedFilteredTasks = filteredTasks.filter((task, index) => index !== sourceIndex);

        // Insert the dragged task at the destination index
        updatedFilteredTasks.splice(destinationIndex, 0, draggedTask);

        // Update the state with the new order
        setListTask((prevList) => {
            // Create a copy of the previous list
            const newList = [...prevList];

            // Find the index of the dragged task in the original list
            const originalIndex = prevList.findIndex((task) => task.id === draggedTask.id);

            // Remove the dragged task from its original position
            newList.splice(originalIndex, 1);

            // Insert the dragged task at the new position
            newList.splice(destinationIndex, 0, draggedTask);

            return newList;
        });
    };

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
                        Active
                    </button>
                </div>
            </div>

            <div className='list-todo'>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="tasks" >
                        {(providedDroppable) => {
                            //console.log(providedDroppable);
                            return (
                                <>
                                    <div ref={providedDroppable.innerRef}>
                                        {!loading ? (
                                            <TableTaskList
                                                listTask={filteredTasks}
                                                setCurrentPage={setCurrentPage}
                                                pageCount={pageCount}
                                                currentPage={currentPage}
                                                setListTask={setListTask}
                                                providedDroppable={providedDroppable}
                                            />
                                        ) : (
                                            <>
                                                <div className="d-flex justify-content-center">
                                                    Loading ...
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </>
                            )
                        }}
                    </Droppable>
                </DragDropContext>

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

export default ListTask