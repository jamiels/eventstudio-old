import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/public/onboard/`;

const addSponsorOnboarding = (data, eventUUID) => {

    return axios.post(API_URL + `${eventUUID}`, data)
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            return err.message;
        });
};

const getSponsorBoardings = () => {
    return axios.get(API_URL + "all")
        .then((response) => {
            return response.data;
        });
};

const deleteSponsorOnboarding = (id) => {
    return axios.delete(API_URL + `${id}`)
        .then((response) => {
            return response.data;
        });
};

export default {
    addSponsorOnboarding,
    getSponsorBoardings,
    deleteSponsorOnboarding
};
