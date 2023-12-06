import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTask, changeTaskOrder, deleteAllTasks, deleteDoneTask, getAllNoPaging } from '../../services/apiServices'
import { useEffect } from 'react'
import TableTaskList from './TableTaskList'
import './Task.scss'
import { toast } from 'react-toastify'
import AddList from './AddList'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useRef } from 'react'

const ListTask = () => {

    //const [listTask, setListTask] = useState([])
    const [sortedList, setSortedList] = useState([])

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const account = useSelector((state) => state.user.account)
    const userId = account.id

    const scrollableContainerRef = useRef(null)

    const fetchAPI = async () => {
        setLoading(true)

        try {
            let res = await getAllNoPaging(userId)

            if (res.status === 200) {
                const tasks = res.data
                const sortedList = [...tasks].sort((a, b) => a.position - b.position)
                console.log("List: ", sortedList)
                setSortedList(sortedList)
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    const filteredTasks = filter === 'all'
        ? sortedList
        : filter === 'completed'
            ? sortedList.filter((list) => list.done)
            : sortedList.filter((list) => !list.done);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
    }

    const handleDeleteDoneTask = async () => {
        let res = await deleteDoneTask(userId)
        const currentTask = sortedList.filter(item => item.done === false)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setSortedList(currentTask)
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleDeleteAllTask = async () => {
        let res = await deleteAllTasks(userId)
        if (res.status === 200) {
            toast.success('Delete successfully')
            setSortedList([])
        } else {
            toast.error("Something is wrong")
        }
    }

    const handleAddTask = async (title) => {
        try {
            let res = await addTask(title)
            //console.log("Add Task Response:", res);

            if (res.status === 200) {

                const addedTasks = res.data
                setSortedList([addedTasks, ...filteredTasks])

                //fetchAPI()
                toast.success('Add successfully')
            } else {
                Object.values(res.data.detailedMessages).map((item, index) => {
                    toast.error(item)
                })
            }
        } catch (err) {
            toast.error("There is something wrong ", err)
        }
    }

    const changeTaskPositions = async (tasks) => {

        const data = tasks.map(({ id, position }) => ({ id, position }))

        //  console.log("data: ", data)
        try {
            let res = await changeTaskOrder(data)
            if (res.status === 200) {
                console.log("Sorted")
            } else {
                toast.error("Something is wrong")
            }
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const handleDrag = (result) => {
        // /console.log(result)
        if (!result.destination) return;

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        if (result.type === "TASK") {
            // Get the dragged task
            const draggedTask = filteredTasks[sourceIndex];

            // Update the filtered task list without the dragged task
            const updatedFilteredTasks = filteredTasks.filter((task, index) => index !== sourceIndex);

            // Insert the dragged task at the destination index
            updatedFilteredTasks.splice(destinationIndex, 0, draggedTask);

            //Update the state with the new order
            setSortedList((prevList) => {
                // Create a copy of the previous list
                const newList = [...prevList];

                // Find the index of the dragged task in the original list
                const originalIndex = prevList.findIndex((task) => task.id === draggedTask.id);

                // Remove the dragged task from its original position
                newList.splice(originalIndex, 1);

                // Insert the dragged task at the new position
                newList.splice(destinationIndex, 0, draggedTask);

                // Update the state with the new order
                setSortedList(newList);

                // Update state with the new order
                changeTaskPositions(newList.map((task, index) => ({ id: task.id, position: index + 1 })));

                return newList;
            })
        }

        if (result.type === 'SUBTASK') {

            // Update the state accordingly
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

            <ul className="nav nav-pills mb-4 pb-2 d-flex justify-content-center align-items-center" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <span
                        className={`nav-link ${filter === 'all' ? 'active' : ''}`}
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected={filter === 'all'}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </span>
                </li>
                <li className="nav-item" role="presentation">
                    <span
                        className={`nav-link ${filter === 'completed' ? 'active' : ''}`}
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected={filter === 'completed'}
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed
                    </span>
                </li>
                <li className="nav-item" role="presentation">
                    <span
                        className={`nav-link ${filter === 'incomplete' ? 'active' : ''}`}
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected={filter === 'incomplete'}
                        onClick={() => handleFilterChange('incomplete')}
                    >
                        Active
                    </span>
                </li>
            </ul>

            <div className='list-todo' ref={scrollableContainerRef}>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="tasks" type="TASK"
                        renderClone={(provided, snapshot, rubric) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                    ...provided.draggableProps.style,
                                    border: snapshot.isDragging ? 'solid 2px #d0d0d0' : '',
                                    padding: snapshot.isDragging ? '.5em .8em .5em .5em' : ''
                                }}
                                className={filteredTasks[rubric.source.index].done ? 'completed' : 'incomplete'}
                            >
                                {filteredTasks[rubric.source.index].title}
                            </div>
                        )}

                    >
                        {(providedDroppable) => {
                            //console.log(providedDroppable);
                            return (
                                <>
                                    <div
                                        ref={(el) => {
                                            providedDroppable.innerRef(el)
                                            scrollableContainerRef.current = el
                                        }}
                                    >
                                        {!loading ? (
                                            <TableTaskList
                                                listTask={filteredTasks}
                                                providedDroppable={providedDroppable}
                                                setSortedList={setSortedList}
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