import http from "../http-common";

const get = (id) => {
    return http.get(`/user/${id}`);
};

const getAll = () => {
    return http.get("/user/");
};

const create = (data) => {
    return http.post("/user/create/", data);
};

const update = (id, data) => {
    return http.put(`/user/${id}`, data);
};

const remove = (id) => {
    return http.delete(`/user/${id}`);
};

const getByEmail = (email) => {
    return http.get(`/user?email=${email}`);
}

const login = (data) => {
    return http.post("/user/login/", data);
};

const loggedIn = () => {
    return http.get("/user/loggedIn/");
};

const logout = () => {
    return http.get("/user/logout/");
};

const UserService = {
    get,
    getAll,
    create,
    update,
    remove,
    login,
    loggedIn,
    logout,
    getByEmail
};

export default UserService;