import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/venue/";



const addVenue = ( data) => {
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


const getVenue = () => {
    return axios.get(`${API_URL}events/getvenues`)
        .then((response) => {
           return response.data;
        });
};

const deleteVenue = (id) => {
    return axios.delete(`${API_URL}delete/${id}`)
    
    .then((response) => {
        console.log("del",response?.data);
        return response.data;
    });
};



export default {
    addVenue,
    getVenue,
    deleteVenue
};