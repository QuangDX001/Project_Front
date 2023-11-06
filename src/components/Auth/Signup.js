import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doSignup } from "../../redux/action/userAction";
//import { forgotPass, postLogin } from "../../services/apiService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Login.scss";
import { postSignup } from "../../services/apiServices";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerAPI = async () => {
        let data = await postSignup(username, password, email);

        //console.log("data ", data);
        if (data.status === 200) {
            toast.success("Register successful, please login")
            setLoading(false);

            dispatch(doSignup(data))
            navigate("/login")
        } else {
            setLoading(false);
            Object.values(data.data.error).map((item, index) => {
                // msgToast += item + "\n";
                toast.error(item);
            });
        }
    }


    const handleSubmit = async () => {
        if (!email) return toast.error("Email is required!");
        if (!username) return toast.error("Username is required!");
        if (!password) return toast.error("Password is required!");
        if (username.length < 3 || username.length > 20) return toast.error(" The username must be between 3 and 20 characters.")
        if (password.length < 6) return toast.error("Password must have at least 6 characters!");

        //api
        setLoading(true)
        await registerAPI()


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
                            Register Form
                        </h3>
                        <div className="login-form form-group ">
                            <label>Username</label>
                            <input
                                type={"email"}
                                className="form-control mt-2"
                                value={username}
                                placeholder="Please input username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group ">
                            <label>Password</label>
                            <input
                                type={"password"}
                                className="form-control"
                                value={password}
                                placeholder="Please input password"
                                onChange={(e) => setPassword(e.target.value)}

                            />
                        </div>
                        <div className="form-group ">
                            <label>Email</label>
                            <input
                                type={"email"}
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Please input email"
                                onKeyDown={(e) => handleKeyDown((e) => handleKeyDown(e))}
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
                                Submit
                                {loading === true ? <AiOutlineLoading3Quarters className="spin" /> : <></>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;
