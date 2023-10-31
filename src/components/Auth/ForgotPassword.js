import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPassword } from '../../services/apiServices'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import "./Login.scss"

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [loading, isLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (!email) return toast.error("Email is required")

        isLoading(true)
        let data = await resetPassword(email)
        if (data.status === 200) {
            toast.success("Email Sent! Please check your email")
            isLoading(false)
        } else {
            isLoading(false)
            Object.values(data.data.error).map((item, index) => {
                toast.error(item)
            })
        }
    }


    return (
        <div className="wr_lg ">
            <div className="container_lg d-flex">
                <div className="text-box w-50 m-auto">

                    <h1>Home</h1>
                    <div className="lg_row">
                        <p onClick={() => navigate("/")}>Go To</p>
                    </div>
                </div>
                <div className="lg_right w-100 m-auto">
                    <div className="login-content col-4 mx-auto d-flex flex-column gap-3 ">
                        <h3
                            style={{
                                color: "#fff",
                                fontSize: "35px",
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: "600",
                            }}
                        >
                            ForgotPassword
                        </h3>
                        <div className="login-form form-group ">
                            <label>Email</label>
                            <input
                                type={"email"}
                                className="form-control mt-2"
                                value={email}
                                placeholder="Please input email "
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <span className="forgot-password" onClick={() => navigate("/login")}>
                            <label
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                Return to Login page
                            </label>
                        </span>
                        <div>
                            <button
                                className="btn-submit"
                                onClick={() => handleSubmit()}
                                disabled={loading}
                            >
                                Send
                                {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword