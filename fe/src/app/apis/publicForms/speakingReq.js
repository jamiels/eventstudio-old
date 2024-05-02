import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/public/speak/`;

const addSpeakingRequest = (data, id) => {
    return axios.post(API_URL + `${id}`, data)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            return err.message;
        });
};

const getSpeakingRequests = () => {
    return axios.get(API_URL + "all")
        .then((response) => {
            return response.data;
        });
};

const deleteSpeakingRequest = (id) => {
    return axios.delete(API_URL + `${id}`)
        .then((response) => {
            return response.data;
        });
};

export default {
    addSpeakingRequest,
    getSpeakingRequests,
    deleteSpeakingRequest
};
