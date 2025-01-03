import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/space/`; // Updated API URL

const addSpace = (data, token) => { // Updated function name to addSpace
    return axios.post(API_URL + "add", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log("error", err)
            return err.message;
        });
};

const addUserToSpace = (data, token) => { // Updated function name to addUserToSpace
    return axios.post(API_URL + "addUser", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log("error", err)
            return err;
        });
};

const getSpaces = (token) => { // Updated function name to getSpaces
    return axios.get(API_URL + "userspace", { // Updated endpoint name to userteams
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log("🚀 ~ .then ~ response: get spaces", response) // Updated log message
            return response.data;
        });
};

const deleteSpace = (id, token) => { // Updated function name to deleteSpace
    return axios.delete(`${API_URL}${id}`, { // Updated endpoint name to userteams
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) // Updated API URL
        .then((response) => {
            console.log("del", response?.data);
            return response.data;
        });
};


const updateSpace = (id, data, token) => { 
    return axios.put(`${API_URL}update/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        });
};

const getAllUserSpace = (space_id, token) => {
    return axios.get(`${API_URL}getAllUsers/${space_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        });
};


export default {
    addSpace,
    getAllUserSpace,
    updateSpace,
    getSpaces,
    deleteSpace,
    addUserToSpace
};
