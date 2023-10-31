import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { putProfile } from '../../services/apiServices'
import { toast } from 'react-toastify'



const ModalUpdateProfile = (pros) => {

    const { show, setShow, dataUpdate, fetchProfile } = pros

    const handleClose = () => {
        setShow(false)
    }

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (show === false) return

        console.log("dataUpdate >> ", dataUpdate)
        if (Object.keys(dataUpdate).length > 0) {
            setFirstName(dataUpdate.firstName)
            setLastName(dataUpdate.lastName)
            setAddress(dataUpdate.address)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    const updateProfile = async () => {
        let res = await putProfile(dataUpdate.id, firstName, lastName, address, phone)
        if (res.status === 200) {
            toast.success("Update user successfully")
        } else {
            if (res.data.detailedMessages) {
                Object.values(res.data.detailedMessages).map((item, index) => {
                    toast.error(item);
                });
            } else if (res.data.error) {
                Object.values(res.data.error).map((item, index) => {
                    toast.error(item);
                })
            }
        }
    }

    const handleSubmit = async () => {
        if (!firstName) toast.error("First name is required")
        if (!lastName) toast.error("Last name is required")
        if (!address) toast.error("Address is required")
        if (!phone) toast.error("Phone is required")

        await updateProfile();
        await fetchProfile();
        handleClose()
    }


    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update <b>{dataUpdate.username}</b>'s Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row g-3'>
                        <div className='col-md-6'>
                            <label className='form-label'>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName ? firstName : ""}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName ? lastName : ""}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address ? address : ""}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type='text'
                                className='form-control'
                                value={phone ? phone : ""}
                                onChange={(event) => setPhone(event.target.value)}
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

export default ModalUpdateProfile