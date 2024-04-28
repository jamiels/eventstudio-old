import axios from "axios";

const API_URL = "http://localhost:8080/public/sponsor/";

const addSponsorRequest = (data, eventUUID) => {
    
    return axios.post(API_URL + `${eventUUID}`, data)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            return err.message;
        });
};

const getSponsorRequests = () => {
    return axios.get(API_URL + "all")
        .then((response) => {
            return response.data;
        });
};

const deleteSponsorRequest = (id) => {
    return axios.delete(API_URL + `${id}`)
        .then((response) => {
            return response.data;
        });
};

export default {
    addSponsorRequest,
    getSponsorRequests,
    deleteSponsorRequest
};
