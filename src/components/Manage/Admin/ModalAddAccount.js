import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { postSignup } from '../../../services/apiServices'
import { toast } from 'react-toastify';

const ModalAddAccount = (pros) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(["admin"]);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const { show, setShow, PAGE_LIMIT } = pros

    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole([""]);
        setLastName("");
        setFirstName("");
        setPhone("");
        setAddress("");
    }

    const handleSubmit = async () => {
        let res = await postSignup(
            username,
            password,
            email,
            role,
            firstName,
            lastName,
            address,
            phone,
        )

        console.log(res)

        if (res.status === 200) {
            handleClose()
            toast.success("Add new account successfully")
        } else {
            Object.values(res.data.message).map((item, index) => {
                toast.error(item)
            })
        }

        pros.setCurrentPage(1)
        await pros.fetchListUser(1, PAGE_LIMIT, "", "")
    }

    return (
        <Modal show={show} size="xl" onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Add new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3" encType="multipart/form-data">
                    <div className="col-md-6">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username || ""}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password || ""}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="col-md-8 ">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email || ""}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Role</label>
                        <Form.Select

                            value={role}
                            //onChange={(event) => setRole(Array.from(event.target.selectedOptions, (option) => option.value))}
                            onChange={(event) => setRole([event.target.value])}
                        >
                            <option value="admin">Admin</option>
                            <option value="mod">Moderator</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName || ""}
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName || ""}
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </div>

                    <div className="col-7">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="XXX.XXX.XXX"
                            value={phone || ""}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                    <div className="col-5">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            value={address || ""}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='success' onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddAccount