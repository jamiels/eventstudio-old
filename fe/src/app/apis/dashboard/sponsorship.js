import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/sponserships/`;



const addSponsorship = (data) => {
    return axios.post(API_URL + "add",
        data,

    )
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log("error", err)
            return err.message;
        });
};


const getSponsorship = (spaceId) => {
    return axios.get(API_URL + `all/${spaceId}`)
        .then((response) => {
            return response.data;
        });
};

const deleteSponsorship = (id) => {
    return axios.delete(`${API_URL}del/${id}`)

        .then((response) => {
            console.log("del", response?.data);
            return response.data;
        });
};

const getSponsorshipsByEvent = (eventId) => {
    return axios.get(API_URL + `events/${eventId}`)
        .then((response) => {
            return response.data;
        });
};

const updateSponsorship = (id, data) => {
    return axios.put(API_URL + `update/${id}`, data)
        .then((response) => {
            return response.data;
        });
}
export default {
    addSponsorship,
    getSponsorship,
    deleteSponsorship,
    getSponsorshipsByEvent,
    updateSponsorship
};