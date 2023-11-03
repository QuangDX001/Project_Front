import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { putStatusUser } from '../../../services/apiServices'
import { toast } from 'react-toastify'

const ModalDisableAccount = (pros) => {
    const { show, setShow, dataDisabled, PAGE_LIMIT } = pros

    const handleClose = () => {
        setShow(false)
    }

    const handleConfirm = async (item) => {
        let res = await putStatusUser(item.id)

        if (res.status === 200) {
            toast.success(`Change status of ${dataDisabled.username} successfully`)
        } else if (res.status === 409) {
            toast.error("You can not disable yourself")
        } else {
            Object.values(res.data.error).map((item, index) => {
                toast.error(item)
            })
        }

        handleClose()
        pros.setCurrentPage(1)
        await pros.fetchListUser(pros.currentPage, PAGE_LIMIT, "", "")

    }

    if (show === true) console.log(dataDisabled);

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Confirm to change user current status?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {dataDisabled.enable ? "Confirm to disable user " : "Confirm to active user "}
                <b>{dataDisabled && dataDisabled.username ? dataDisabled.username : ` `}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='success' onClick={() => handleConfirm(dataDisabled)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDisableAccount