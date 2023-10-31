import axios from 'axios';
import React from 'react'
import nProgress from "nprogress";
import { store } from "../redux/store";
nProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    color: "#e34234",
});

const instance = axios.create({

    baseURL: "http://localhost:8080/api/",
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
    },
});

//Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Content-Type"] = "application/json";
        //get token redux
        const accessToken = store?.getState()?.user?.account?.token;
        //add header
        console.log(accessToken.length);
        if (accessToken.length > 0) {
            config.headers["Authorization"] = "Bearer " + accessToken;
        }
        nProgress.start();
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        nProgress.done();
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        nProgress.done();
        return error && error.response;
    },
);

export default instance;
