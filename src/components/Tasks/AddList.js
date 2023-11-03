import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.scss";
import { Button } from 'react-bootstrap';
import { BiTask } from 'react-icons/bi'

const AddList = ({ onAddTask }) => {
    const [title, setTitle] = useState("")

    const handleSubmit = () => {
        // if (!title) {
        //     //toast.configure();
        //     toast.error("Please input a title first!")
        //     return
        // }

        onAddTask(title)
        setTitle('')
    }

    return (
        <div className="add-todo">
            <div className="input-field">
                <span className="icon">
                    <BiTask />
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
                <Button
                    style={{ marginLeft: '12px' }}
                    type="button"
                    className="btn btn-add"
                    onClick={handleSubmit}
                >
                    Add new task
                </Button>
            </div>
        </div>
    )
}

export default AddList