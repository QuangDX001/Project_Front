import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProfile } from '../../services/apiServices'
import LetterAvatar from './LetterAvatar';
import "./Profile.scss";
import ModalChangePass from './ModalChangePass';
import ModalUpdateProfile from './ModalUpdateProfile';

const Profile = (pros) => {
    const account = useSelector((state) => state.user.account)
    const isEnabled = useSelector((state) => state.status.userStatus.enable)
    const [userData, setUserData] = useState([])

    const [showCP, setShowCP] = useState(false)
    const [dataCP, setDataCP] = useState({})

    const [dataUpdate, setDataUpdate] = useState({})
    const [showUpdate, setShowUpdate] = useState(false)

    const params = useParams()
    const userNameParams = params.username;

    const navigate = useNavigate()
    const fetchProfile = async () => {
        let res = await getProfile(userNameParams)
        console.log(res.data)
        if (res.status === 200) {
            setUserData(res.data)
        } else {
            navigate("/error-authe")
        }
    }

    useEffect(() => {
        fetchProfile()
    }, [userNameParams])

    if (isEnabled === false) return <Navigate to="/error-authe"></Navigate>

    const handleClickCP = (value, item) => {
        setShowCP(value)
        setDataCP(item)
    }

    const handleClickUpdate = (value, item) => {
        setShowUpdate(value)
        setDataUpdate(item)
    }

    return (
        <div className="wrapper">
            <div className="left">
                <div className="d-flex flex-column justify-content-center">
                    <LetterAvatar
                        name={
                            userData.lastName && userData.firstName
                                ? `${userData.firstName} ${userData.lastName}`
                                : ""
                        }
                    />
                    <h3 className="mt-3">{userData.firstName + " " + userData.lastName}</h3>
                    <h5 className="mt-1">{userData.username}</h5>
                </div>
            </div>
            <div className="right">
                <div className="btn-edit d-flex justify-content-end gap-3">
                    {account.username === userData.username ? (
                        <button
                            className="btn btn-warning"
                            onClick={() => handleClickUpdate(true, userData)}
                        >
                            Update Account
                        </button>
                    ) : account.roles.includes("ROLE_ADMIN") ? (
                        <button
                            className="btn btn-warning"
                            onClick={() => handleClickUpdate(true, userData)}
                        >
                            Update Account
                        </button>
                    ) : (
                        <></>
                    )}
                    {account.username === userData.username && (
                        <button className="btn btn-warning" onClick={() => handleClickCP(true, userData)}>
                            Change Password
                        </button>
                    )}
                </div>
                <div className="info mt-3">
                    <h1
                        className="d-flex justify-content-center "
                        onClick={() => {
                            console.log(
                                account.username === userData.username,
                                account.roleName === "ROLE_ADMIN",
                            );
                        }}
                    >
                        Thông tin tài khoản
                    </h1>
                    <div className="info_data">
                        <div className="data">
                            <h3>Email</h3>
                            <p>{userData.email}</p>
                        </div>
                        <div className="data">
                            <h3>Phone Number</h3>
                            <p>{userData.phone}</p>
                        </div>
                    </div>
                    <div className="info_data">
                        <div className="data">
                            <h3>Address</h3>
                            <p>{userData.address}</p>
                        </div>
                        <div className="data">
                            <h3>Balance</h3>
                            <p>
                                {userData.balance
                                    ? `${userData.balance}`
                                    : "The account is currently empty"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ModalChangePass show={showCP} setShow={setShowCP} data={dataCP} />
            <ModalUpdateProfile
                show={showUpdate}
                setShow={setShowUpdate}
                dataUpdate={dataUpdate}
                fetchProfile={fetchProfile}
            />
        </div>
    )
}

export default Profile