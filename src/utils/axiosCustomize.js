import axios from 'axios';
//import React from 'react'

const instance = axios.create({

    baseURL: "http://localhost:8080/api/v1/",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
    },
});

export default instance;
