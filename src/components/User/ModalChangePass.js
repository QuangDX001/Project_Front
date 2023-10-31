import React from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { changePassword } from '../../services/apiServices'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const ModalChangePass = (pros) => {

    const { show, setShow, data } = pros
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const handleClose = () => {
        setShow(false)
        setCurrentPass("")
        setNewPass("")
        setConfirmPass("")
    }

    const changePassAPI = async () => {
        let res = await changePassword(data.id, currentPass, newPass, confirmPass)
        //console.log(res)
        if (res.status === 200) {
            toast.success("Change password successfully")
            handleClose()
        } else {
            Object.values(res.data.detailedMessages || res.data.error).map((item, index) => {
                toast.error(item);
            });
        }
    };

    useEffect(() => {
        if (show === true) {
            console.log(data)
        }
    }, [show])

    const handleSubmit = () => {
        if (!currentPass) return toast.error("Current password is required")
        if (!newPass) return toast.error("New password is required")
        if (!confirmPass) return toast.error("Confirm is required")
        if (currentPass.length < 6) return toast.error("Password must have at least 6 characters")
        if (newPass.length < 6) return toast.error("Password must have at least 6 characters")
        if (confirmPass.length < 6) return toast.error("Password must have at least 6 characters")

        changePassAPI()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Change Pass</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row g-3'>
                        <div className='col-md-8'>
                            <label className='form-label'>Old Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={currentPass ? currentPass : ""}
                                onChange={(event) => setCurrentPass(event.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={newPass ? newPass : ""}
                                onChange={(event) => setNewPass(event.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={confirmPass ? confirmPass : ""}
                                onChange={(event) => setConfirmPass(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-secondary' onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant='success' onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePass