import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTask, deleteAllTasks, deleteDoneTask, getAllNoPaging } from '../../services/apiServices'
import { useEffect } from 'react'
import TableTaskList from './TableTaskList'
import './Task.scss'
import { toast } from 'react-toastify'
import AddList from './AddList'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useRef } from 'react'

const ListTask = () => {

    const [listTask, setListTask] = useState([])

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');

    const account = useSelector((state) => state.user.account)
    const userId = account.id

    const scrollableContainerRef = useRef(null)

    const fetchAPI = async () => {
        setLoading(true)

        try {
            let res = await getAllNoPaging(userId)
            console.log(res)

            if (res.status === 200) {
                setListTask(res.data)
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
        ? listTask
        : filter === 'completed'
            ? listTask.filter((list) => list.done)
            : listTask.filter((list) => !list.done);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter)
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
        try {
            let res = await addTask(title)
            console.log(res)
            if (res.status === 200) {

                const addedTasks = res.data

                // Update the task list with the added task
                setListTask((prevTasks) => {
                    const newList = [addedTasks, ...prevTasks.slice()];

                    // Update Redux state with the new order
                    updateTaskOrder(newList);

                    // Log the updated state
                    console.log('Updated State:', newList);

                    return newList;
                });

                //fetchAPI()
                toast.success('Add successfully')
            } else {
                Object.values(res.data.detailedMessages).map((item, index) => {
                    toast.error(item)
                })
            }
        } catch (err) {
            console.error("Error: ", err)
        }
    }

    const updateTaskOrder = (tasks) => {
        localStorage.setItem('taskOrder', JSON.stringify(tasks.map((task) => task.id)));
    }

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

            // Update the state with the new order
            setListTask(newList);

            // Update Redux state with the new order
            updateTaskOrder(newList);

            return newList;
        })
    }

    useEffect(() => {
        const initializeListTask = async () => {
            try {
                let fetchedList = [];

                // Fetch the data
                const res = await getAllNoPaging(userId);

                if (res.status === 200) {
                    fetchedList = res.data;
                    console.log('Fetched List:', fetchedList);
                }

                const storedOrder = localStorage.getItem('taskOrder');

                // Update the task list based on the order
                if (storedOrder) {
                    const orderArray = JSON.parse(storedOrder);

                    // Update the task list based on the order
                    const orderedTasks = orderArray.map((id) =>
                        fetchedList.find((task) => task.id === id)
                    ).filter(Boolean);

                    // Set the state with the ordered tasks
                    setListTask(orderedTasks);

                    console.log('Stored Order:', storedOrder);
                    console.log('List Task:', orderedTasks);
                } else {
                    // If no order in localStorage, set the state with the fetched data
                    setListTask(fetchedList);
                    console.log('List Task:', fetchedList);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        // Call the async function
        initializeListTask();
    }, [userId]);

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

            <div className='list-todo' ref={scrollableContainerRef}>
                <DragDropContext onDragEnd={handleDrag}>
                    <Droppable droppableId="tasks"
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