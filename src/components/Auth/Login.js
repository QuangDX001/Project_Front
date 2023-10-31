import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../../redux/action/userAction";
import { postLogin } from '../../services/apiServices'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Login.scss";
import "./Report.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    // const toMain = () => {
    //     navigate("/");
    // };
    if (isAuthenticated) return <Navigate to="/"></Navigate>;
    const handleSubmit = async () => {
        //api
        setLoading(true);

        let data = await postLogin(username, password);
        //console.log("data ", data);
        if (data.status === 200) {
            toast.success("Login Success");
            setLoading(false);

            dispatch(doLogin(data));
        } else {
            setLoading(false);
            // toast.error("Có lỗi xảy ra trong quá trình đăng nhập");
            Object.values(data.data.error).map((item, index) => {
                // msgToast += item + "\n";
                toast.error(item);
            });
        }
    };

    const handleKeyDown = (e) => {
        if (e && e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="wr_lg ">
            <div className="container_lg d-flex">
                <div className="text-box w-50 m-auto">

                    <h1>Home</h1>
                    {/* <h3>Hệ thống quản lý chấm công </h3> */}
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
                            Login Form
                        </h3>
                        <div className="login-form form-group ">
                            <label>Username</label>
                            <input
                                type={"email"}
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group ">
                            <label>Password</label>
                            <input
                                type={"password"}
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown((e) => handleKeyDown(e))}
                            />
                        </div>
                        <div className="alter-option"
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <span className="signup" onClick={() => navigate("/signup")}>
                                <label
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    Don't have an account yet?
                                </label>
                            </span>
                            <span className="forgot-password" onClick={() => navigate("/forgot-password")}>
                                <label
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    ForgotPassword?
                                </label>
                            </span>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSubmit()}
                                disabled={loading}
                            >
                                Login
                                {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
