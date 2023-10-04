import axios from "../utils/axiosCustomize"

const getAllTask = () => {
    return axios.get("tasks")
}

const addTask = (title) => {
    let data = {
        title: title,
    }

    return axios.post("tasks/addTask", data)
}

const changeStatusTask = (taskId) => {
    return axios.put(`tasks/${taskId}`);
};

const deleteTaskById = (taskId) => {
    return axios.delete(`tasks/${taskId}`);
}

const deleteAllTasks = () => {
    return axios.delete("all")
}

const deleteDoneTask = () => {
    return axios.delete("completed")
}

const editTaskDone = (taskId, title) => {
    return axios.put(`tasks/updateTask/${taskId}`, { title })
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