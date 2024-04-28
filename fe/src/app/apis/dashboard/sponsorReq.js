import axios from "axios";

const API_URL = "http://localhost:8080/public/sponsor/";



const addSponsorReq = ( data) => {
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



const getSponsorReq = () => {
    return axios.get(API_URL + "names")
        .then((response) => {
           return response.data;
        });
};


export default {
    addSponsorReq,
    getSponsorReq,
};