import http from "../http-common-med";

const get = (id) => {
    return http.get(`/meds/${id}`);
};

const getAll = () => {
    return http.get("/meds/");
};

const update = (id, data) => {
    return http.put(`/meds/${id}`, data);
};

const getByMedName = (medName) => {
    return http.get(`/meds?medName=${medName}`);
}

const MedService = {
    get,
    getAll,
    update,
    getByMedName
};

export default MedService;