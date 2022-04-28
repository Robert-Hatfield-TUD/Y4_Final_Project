/*
This file contains the setup for the axios requests which include the base url to use and what type of 
content will be sent across the requests.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import axios from "axios";
axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: "http://localhost:8081/api",
    headers: {
        "Content-type": "application/json",
    },
});