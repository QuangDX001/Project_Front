import React from 'react'
import App from './App'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import ErrorPage from './components/Auth/ErrorPage';
import PrivateRoute from './routes/PrivateRoute';
import Profile from "./components/User/Profile";
import Login from "./components/Auth/Login";
import ErrorAuth from './components/Auth/ErrorAuth';
import Signup from './components/Auth/Signup';
import Manage from './components/Manage/Manage';
import ManageAccount from './components/Manage/Admin/ManageAccount';
import ForgotPassword from './components/Auth/ForgotPassword';
import ListTask from './components/Tasks/ListTask';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route
                        path="/task"
                        element={
                            <PrivateRoute acceptRole={[1, 2]}>
                                {/* <List /> */}
                                <ListTask />
                            </PrivateRoute>
                        }
                    ></Route>
                    <Route
                        path='/manage/'
                        element={
                            <PrivateRoute acceptRole={[2, 3]}>
                                <Manage />
                            </PrivateRoute>
                        }
                    >
                        <Route
                            path="manage-account"
                            element={
                                <PrivateRoute acceptRole={[3]}>
                                    <ManageAccount />
                                </PrivateRoute>
                            }
                        />
                        {/* <Route path="manage-staff" /> */}
                    </Route>
                    <Route path="/profile/:username" element={<Profile />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                    <Route path="/error-authe" element={<ErrorAuth />}></Route>
                    <Route path="*" element={<ErrorPage />}></Route>
                </Route>
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Layout