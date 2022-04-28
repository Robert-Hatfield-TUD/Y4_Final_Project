/*
This section of the application handles the requests for the user which includes requests such as creating
a user and logging in a user.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

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
    logout,
    getByEmail
};

export default UserService;