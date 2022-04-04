import React, { useEffect, useState, createContext } from "react";
import UserService from "../Service/UserService";

const AuthoriseContext = createContext();

function Auth(properties) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedInUser() {

        const response = await UserService.loggedIn();
        setLoggedIn(response.data);

    }

    useEffect(() => {

        getLoggedInUser();

    }, []);

    return (

        <AuthoriseContext.Provider value={{ loggedIn, getLoggedInUser }}>
            {properties.children}
        </AuthoriseContext.Provider>

    );

}

export default AuthoriseContext;
export { Auth };