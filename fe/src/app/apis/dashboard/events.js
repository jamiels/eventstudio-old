import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/events/`;

const getVeneue = (spaceId) => {
    console.log("🚀 ~ getVeneue ~ spaceId:", spaceId)
    return axios.get(API_URL + `getvenues/${spaceId}`, {})
        .then((response) => {
            console.log("hello", response?.data)
            return response.data;
        });
};

const addEvent = (userId, data) => {
    console.log("addevent", data)
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


const getEvents = (spaceId) => {
    return axios.post(API_URL + `get/${spaceId}`, {})
        .then((response) => {
            return response.data;
        });
};

const getActiveEvents = (spaceId) => {
    return axios.get(API_URL + `active/${spaceId}`, {})
        .then((response) => {
            return response.data;
        });
};


const deleteEvent = (id) => {
    return axios.post(API_URL + "delete", { id: id })
        .then((response) => {
            return response.data;
        });
};

const updateEvent = (id, data) => {
    return axios.put(API_URL + `update/${id}`, data)
        .then((response) => {
            return response.data;
        });
}


export default {
    getVeneue,
    getActiveEvents,
    addEvent,
    getEvents,
    deleteEvent,
    updateEvent
};