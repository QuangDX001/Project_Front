import axios from "../utils/axiosCustomize"

/* Task related API */

const getAllTask = (pageNo, pageSize, userId, filter) => {
    return axios.get(`v1/tasksForMods?pageNo=${pageNo}&pageSize=${pageSize}`)
}

const getAllNoPaging = (userId, filter) => {
    return axios.get(`v1/tasks?userId=${userId}`)
}

const addTask = (title) => {
    let data = {
        title: title,
    }
    return axios.post("v1/tasks/addTask", data)
}

const changeStatusTask = (taskId) => {
    return axios.put(`v1/tasks/${taskId}`);
}

const changeTaskOrder = (tasks) => {
    return axios.put("v1/tasks/updateOrder", tasks)
}

const editTaskDone = (taskId, title) => {
    return axios.put(`v1/tasks/updateTask/${taskId}`, {
        title: title
    })
}

/* SubTask related API */

const addSubTask = (title, taskId) => {
    let data = {
        title: title,
        taskId: taskId
    }
    return axios.post("v1/subtasks/addTask", data)
}

const changeSubTaskOrder = (tasks) => {
    return axios.put("v1/subtasks/updateOrder", tasks)
}

const editSubTaskDone = (taskId, title) => {
    return axios.put(`v1/subtasks/updateTask/${taskId}`, {
        title: title
    })
}

const changeStatusSubTask = (taskId) => {
    return axios.put(`v1/subtasks/${taskId}`);
}
/* Delete task API */

const deleteSubTaskById = (taskId) => {
    return axios.delete(`v1/subtasks/${taskId}`)
}

const deleteTaskById = (taskId, userId) => {
    return axios.delete(`v1/tasks/${taskId}?userId=${userId}`);
}

const deleteAllTasks = (userId) => {
    return axios.delete(`v1/all/${userId}`);
}

const deleteDoneTask = (userId) => {
    return axios.delete(`v1/completed/${userId}`)
}

/* User related API */

const postLogin = (username, password) => {
    return axios.post(`auth/login`, {
        username: username + "",
        password: password + "",
    });
};
const postSignup = (username, password, email, role, firstName, lastName, address, phone) => {
    let data = {
        username: username,
        password: password,
        email: email,
        role: role,
        accountAddDTO: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
        }
    }

    return axios.post("auth/signup", data)
}

const getProfile = (username) => {
    return axios.get(`crud/getProfile/${username}`)
}

const getStatus = (userId) => {
    return axios.get(`crud/id/${userId}`)
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
    return axios.put(`crud/resetPasswordForAdmin/${username}`, {
        newPassword: newPassword
    })
}

const putProfile = (id, firstName, lastName, address, phone) => {
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
    getAllNoPaging,
    addTask,
    addSubTask,
    changeStatusTask,
    changeStatusSubTask,
    changeTaskOrder,
    changeSubTaskOrder,
    deleteTaskById,
    deleteSubTaskById,
    deleteAllTasks,
    deleteDoneTask,
    editTaskDone,
    editSubTaskDone,
    postLogin,
    postSignup,
    getProfile,
    getAllUsers,
    getCombineUsers,
    changePassword,
    resetPassword,
    putProfile,
    putStatusUser,
    resetPasswordAdmin,
    getStatus,
};