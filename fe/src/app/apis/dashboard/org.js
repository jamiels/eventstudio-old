import axios from "axios";

const API_URL = "http://localhost:8080/dashboard/org/";



const addOrg = ( data) => {
    console.log("hello from datta",data)
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


const getOrg = () => {
    return axios.get(API_URL + "names")
        .then((response) => {
           return response.data;
        });
};



const deleteOrg = (id) => {
    return axios.delete(`${API_URL}delete/${id}`)
    
    .then((response) => {
        console.log("del",response?.data);
        return response.data;
    });
};


export default {
    addOrg,
    getOrg,
    deleteOrg
};