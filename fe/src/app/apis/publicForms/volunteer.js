import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/public/volunteer/`;

const addVolunteerRequest = (data, id) => {
    return axios.post(API_URL + `${id}`, data)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            return err.message;
        });
};

const getVolunteerRequests = () => {
    return axios.get(API_URL + "all")
        .then((response) => {
            return response.data;
        });
};

const deleteVolunteerRequest = (id) => {
    return axios.delete(API_URL + `${id}`)
        .then((response) => {
            return response.data;
        });
};

export default {
    addVolunteerRequest,
    getVolunteerRequests,
    deleteVolunteerRequest
};
