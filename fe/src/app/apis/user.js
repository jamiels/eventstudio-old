import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/user/create-password`;

const createPassword = (newPassword, token) => {
    return axios.post(API_URL, { newPassword, token })
        .then((response) => {
            console.log("createpassword", response?.data)
            return response.data;
        });
};


export default {
    createPassword
};