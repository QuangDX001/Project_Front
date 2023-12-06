import React, { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import "./Task.scss";
import { Button } from 'react-bootstrap';

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
        <section className="add-todo">
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col">
                        <div className="card">
                            <div className="card-body p-3">
                                <div className="d-flex justify-content-center align-items-center mb-4">
                                    <div className="form__group field flex-fill">
                                        <input
                                            type="input" id="task" className="form__field"
                                            value={title}
                                            placeholder='task' name='task'
                                            onChange={(event) => setTitle(event.target.value)}
                                        />
                                        <label htmlFor="task" className='form__label'>New Tasks</label>
                                    </div>
                                    <Button type="submit" variant="outline-success" size="sm" className="btn ms-2" onClick={handleSubmit}>Add</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddList