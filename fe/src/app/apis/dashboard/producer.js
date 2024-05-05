import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/dashboard/producer/`;



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


const getProducer = (spaceId) => {
    return axios.get(API_URL + `names/${spaceId}`)
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

const updateProducer= (id, data) => {
    return axios.put(API_URL + `update/${id}`, data)
        .then((response) => {
            return response.data;
        });
}

export default {
    addProducer,
    getProducer,
    deleteProducer,
    updateProducer
};