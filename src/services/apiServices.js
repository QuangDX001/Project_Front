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

export {
    getAllTask,
    addTask,
    changeStatusTask,
    deleteTaskById,
    deleteAllTasks,
    deleteDoneTask,
    editTaskDone
};