import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/events/";

const getVeneue = () => {
    return axios.post(API_URL + "getVeneue", {})
    .then((response) => {
        return response.data;
    });
};

const addEvent = (userId, data) => {
    return axios.post(API_URL + "add", {
        userId,
        data,
    })
    .then((response) => {
        return response.data;
    })
    .catch(err => {
        return err.message;
    });
};


const getEvents = () => {
    return axios.post(API_URL + "get", {})
    .then((response) => {
        return response.data;
    });
};


const deleteEvent = (id) => {
    return axios.post(API_URL + "delete", {id: id})
    .then((response) => {
        return response.data;
    });
};


export default {
    getVeneue,
    addEvent,
    getEvents,
    deleteEvent
};