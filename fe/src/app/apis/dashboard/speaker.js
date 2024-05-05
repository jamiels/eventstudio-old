import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/speakers/`;



const addSpeaker = ( data) => {
    return axios.post(API_URL + "add", 
        data,
    )
    .then((response) => {
        return response.data;
    })
    .catch(err => {
        console.log("error",err)
        return err.message;
    });
};


const getSpeakersByEvent = (eventId) => {
    return axios.get(API_URL + `events/${eventId}`)
        .then((response) => {
            return response.data;
        });
};
const getSpeaker = (spaceId) => {
    return axios.get(API_URL + `names/${spaceId}`)
        .then((response) => {
           return response.data;
        });
};

const deleteSpeaker = (id) => {
    return axios.delete(`${API_URL}del/${id}`)
    
    .then((response) => {
        console.log("del",response?.data);
        return response.data;
    });
};

const updateSpeaker= (id, data) => {
    return axios.put(API_URL + `update/${id}`, data)
        .then((response) => {
            return response.data;
        });
}

export default {
    addSpeaker,
    getSpeaker,
    deleteSpeaker,
    getSpeakersByEvent,
    updateSpeaker
};