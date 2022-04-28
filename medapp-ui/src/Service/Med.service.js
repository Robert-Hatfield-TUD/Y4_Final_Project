/*
This is the service section of the application which allows for requests to be made among the ones
below. The requests each handle something different such as getting all medications and getting a 
single medication by its ID.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import http from "../http-common-med";

const get = (id) => {
    return http.get(`/meds/${id}`);
};

const getAll = () => {
    return http.get("/meds/");
};

const update = (id, data) => {
    return http.put(`/meds/update/${id}`, data);
};

const getByMedName = (medName) => {
    return http.get(`/meds?medName=${medName}`);
}

const getByTreatment = (treatment) => {
    return http.get(`/meds?treatment=${treatment}`);
}

const getByPerscribed = (userDets) => {
    return http.get(`/meds?userDets=${userDets}`);
}

const MedService = {
    get,
    getAll,
    update,
    getByMedName,
    getByTreatment,
    getByPerscribed
};

export default MedService;