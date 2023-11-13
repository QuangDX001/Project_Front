import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { getStatus } from '../services/apiServices';
import { updateUser } from '../redux/action/userAction';

const PrivateRoute = (pros) => {
    const account = useSelector((state) => state.user.account)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const isEnabled = useSelector((state) => state.status.userStatus.enable)
    const dispatch = useDispatch();
    console.log('Enable:', isEnabled);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const userStatus = await getStatus(pros.userId)
                dispatch(updateUser(userStatus))
            } catch (err) {
                console.error("Error fetching status", err)
            }
        }

        // if (isAuthenticated) {
        //     fetchStatus();
        // }

        fetchStatus()

    }, [dispatch, pros.userId, isAuthenticated])

    const roles = {
        "ROLE_USER": 1,
        "ROLE_MODERATOR": 2,
        "ROLE_ADMIN": 3
    }

    function getRole(roleName) {
        const check = roles[roleName];
        return check !== undefined ? check : 0;
    }

    // function getRole(index) {
    //     //const { roles } = this.state;

    //     if (index >= 0 && index < roles.length) {
    //         return roles[index];
    //     } else {
    //         return 'Role not found';
    //     }
    // };

    // console.log(pros, "ABC", getRoleId(99));
    const flag = pros.acceptRole.includes(getRole(account.roles));
    if (!flag) return <Navigate to="/error-authe"></Navigate>;
    if (isEnabled === false) return <Navigate to="/error-authe"></Navigate>;

    if (isAuthenticated === false) {
        return <Navigate to="/login"></Navigate>;
    }
    return <>{pros.children}</>;
};

export default PrivateRoute