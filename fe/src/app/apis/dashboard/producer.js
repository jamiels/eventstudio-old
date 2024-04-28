import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/producer/";



const addProducer = ( data) => {
    return axios.post(API_URL + "add", 
        data,
        
    )
    .then((response) => {
        return response.data;
    })
    .catch(err => {
        return err.message;
    });
};


const getProducer = () => {
    return axios.get(API_URL + "names")
        .then((response) => {
           return response.data;
        });
};



const deleteProducer = (id) => {
    return axios.delete(`${API_URL}del/${id}`)
    
    .then((response) => {
        return response.data;
    });
};


export default {
    addProducer,
    getProducer,
    deleteProducer
};