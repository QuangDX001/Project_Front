import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { resetPasswordAdmin } from '../../../services/apiServices'
import { toast } from 'react-toastify'

const ModalResetPass = (pros) => {

    const { show, setShow, dataReset, PAGE_LIMIT } = pros
    const [newPass, setNewPass] = useState("")

    const handleClose = () => {
        setShow(false)
        setNewPass("")
    }

    const handleSubmit = async () => {
        if (!newPass) toast.error("Password is required")
        if (newPass.length < 6) toast.error("Password must be at least 6 characters")

        let res = await resetPasswordAdmin(dataReset.username, newPass)

        if (res.status === 200) {
            handleClose()
            toast.success("Password has been reset")
        } else {
            Object.values(res.data.error).map((item, index) => {
                toast.error(item)
            })
        }

        pros.setCurrentPage(1)
        await pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "")

    }

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Reset Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row g-3' encType="multipart/form-data">
                    <div className='col-md-6'>
                        <label className='form-label'>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPass || ""}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='success' onClick={handleSubmit}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalResetPass