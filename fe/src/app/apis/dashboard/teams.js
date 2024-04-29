import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/teams/`;

const addTeam = (data, token) => {
    return axios.post(API_URL + "add", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log("error", err)
            return err.message;
        });
};

const addUserToTeam = (data, token) => {
    return axios.post(API_URL + "addUser", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            console.log("error", err)
            return err;
        });
};

const getTeams = (token) => {
    return axios.get(API_URL + "userteams", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log("🚀 ~ .then ~ response: get teams", response)
            return response.data;
        });
};

const deleteTeam = (id) => {
    return axios.delete(`${API_URL}${id}`)
        .then((response) => {
            console.log("del", response?.data);
            return response.data;
        });
};

export default {
    addTeam,
    getTeams,
    deleteTeam,
    addUserToTeam
};
