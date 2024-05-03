import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/venue/`;



const addVenue = (data) => {
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


const getVenue = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/Dashboard/events/getvenues`)
        .then((response) => {
            return response.data;
        });
};

const deleteVenue = (id) => {
    return axios.delete(`${API_URL}delete/${id}`)

        .then((response) => {
            console.log("del", response?.data);
            return response.data;
        });
};

const updateVenue = (id, data) => {
    return axios.put(API_URL + `update/${id}`, data)
        .then((response) => {
            return response.data;
        });
}

export default {
    addVenue,
    getVenue,
    deleteVenue,
    updateVenue
};