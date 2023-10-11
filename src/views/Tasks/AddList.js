import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.scss";

const AddList = ({ onAddTask }) => {
    const [title, setTitle] = useState("")

    // const handleSubmit = async (list) => {

    //     let res = await addTask(title)
    //     console.log(res)


    //     if (res.status === 200) {
    //         toast.success("Add successfully")
    //     } else {
    //         toast.error("Something is wrong")
    //     }

    //     await list.fetchData();
    // }

    const handleSubmit = () => {
        if (!title) {
            //toast.configure();
            toast.error("Please input a title first!")
            return
        }

        onAddTask(title)
        setTitle('')
    }

    return (
        <div className="add-todo">
            <div className="input-field">
                <span>
                    <button type="button" className="btn btn-input">
                        <i className="fas fa-book"></i>
                    </button>
                </span>
                <span>
                    <input
                        type="text"
                        placeholder="New Task"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </span>
            </div>
            <div>
                <button
                    type="button"
                    className="btn btn-add"
                    onClick={handleSubmit}
                >
                    Add new task
                </button>
            </div>
        </div>
    )
}

export default AddList