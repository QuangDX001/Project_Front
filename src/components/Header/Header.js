import React from 'react'

import { NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { doLogOut } from '../../redux/action/userAction';
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        navigate('/login');
    }
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    console.log(">>>acc", account);
    const handleLogout = () => {
        //console.log('Logout')
        dispatch(doLogOut())
        toast.success("Logout Success")
        navigate('/login')
    }

    return (

        <Navbar bg='light' expand="lg">
            <Container>
                <NavLink className="navbar-brand" to={"/"}>
                    Menu
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to={"/"}>
                            Homepage
                        </NavLink>
                        {account.roles.includes("ROLE_MORDERATOR") || account.roles.includes("ROLE_USER") ? (
                            <NavLink className="nav-link" to={"/task"}>
                                Task
                            </NavLink>
                        ) : null}
                        {account.roles.includes("ROLE_MODERATOR") && (
                            <NavLink className="nav-link" to={"/manage/manage-tasks"}>
                                Mod Content
                            </NavLink>
                        )}
                        {account.roles.includes("ROLE_ADMIN") && (
                            <NavLink className="nav-link" to={"/manage/manage-account"}>
                                Admin Content
                            </NavLink>
                        )}
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn border-dark mx-2 p-2 border-2"
                                    onClick={() => handleLogin()}
                                >
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <NavDropdown
                                    title={"Hello " + account.username}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        onClick={() => navigate(`/profile/${account.username}`)}
                                    >
                                        User Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        Log Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header