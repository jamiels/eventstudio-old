import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user/`;

const createPassword = (newPassword, token) => {
    return axios.post(API_URL + "create-password", { newPassword, token })
        .then((response) => {
            console.log("createpassword", response?.data)
            return response.data;
        });
};

const updateUser = (updateProf, token) => {
    return axios.post(API_URL + "changepassword", updateProf, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log("createpassword", response?.data)
            return response.data;
        });
}

export default {
    createPassword,
    updateUser
};