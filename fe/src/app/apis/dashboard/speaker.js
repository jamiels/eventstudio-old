import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/speakers/";



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


const getSpeaker = () => {
    return axios.get(API_URL + "names")
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



export default {
    addSpeaker,
    getSpeaker,
    deleteSpeaker
};