import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/sponserships/";



const addSponsorship= ( data) => {
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


const getSponsorship = () => {
    return axios.get(API_URL + "all")
        .then((response) => {
           return response.data;
        });
};

const deleteSponsorship = (id) => {
    return axios.delete(`${API_URL}del/${id}`)
    
    .then((response) => {
        console.log("del",response?.data);
        return response.data;
    });
};



export default {
    addSponsorship,
    getSponsorship,
    deleteSponsorship
};