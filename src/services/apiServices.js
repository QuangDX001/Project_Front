import axios from "../utils/axiosCustomize"

const getAllTask = () => {
    return axios.get("v1/tasks")
}

const addTask = (title) => {
    let data = {
        title: title,
    }

    return axios.post("v1/tasks/addTask", data)
}

const changeStatusTask = (taskId) => {
    return axios.put(`v1/tasks/${taskId}`);
};

const deleteTaskById = (taskId) => {
    return axios.delete(`v1/tasks/${taskId}`);
}

const deleteAllTasks = () => {
    return axios.delete("v1/all")
}

const deleteDoneTask = () => {
    return axios.delete("v1/completed")
}

const editTaskDone = (taskId, title) => {
    return axios.put(`v1/tasks/updateTask/${taskId}`, { title })
}


const postLogin = (username, password) => {
    return axios.post(`auth/login`, {
        username: username + "",
        password: password + "",
    });
};
const postSignup = (username, password, email) => {
    return axios.post(`auth/signup`, {
        username: username + "",
        password: password + "",
        email: email + "",
    })
}

const getProfile = (username) => {
    return axios.get(`crud/getProfile/${username}`)
}

const getAllUsers = () => {
    return axios.get(`crud/paging`)
}

const getCombineUsers = (pageNo, pageSize, sortBy, sortDir) => {
    return axios.get(
        `crud/paging?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
}

const changePassword = (id, pass, newPass, confirmPass) => {
    let data = {
        password: pass,
        newPassword: newPass,
        confirmNewPassword: confirmPass,
    }

    return axios.put(`crud/changePassword/${id}`, data)
}

const resetPassword = (email) => {
    return axios.post(`crud/sendForgotPassword?email=${email}`)
}

const resetPasswordAdmin = (username, newPassword) => {
    let data = {
        newPassword: newPassword
    }
    return axios.put(`crud/resetPasswordForAdmin/${username}`, {
        newPassword: newPassword
    })
}

const putProfile = (id, firstName, lastName, address, phone) => {
    let data = {
        firstName,
        lastName,
        address,
        phone,
    }

    return axios.put(`crud/updateUser/${id}`, {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
    })
}

const putStatusUser = (id) => {
    return axios.put(`crud/changeEnableStatus/${id}`)
}
export {
    getAllTask,
    addTask,
    changeStatusTask,
    deleteTaskById,
    deleteAllTasks,
    deleteDoneTask,
    editTaskDone,
    postLogin,
    postSignup,
    getProfile,
    getAllUsers,
    getCombineUsers,
    changePassword,
    resetPassword,
    putProfile,
    putStatusUser,
    resetPasswordAdmin
};