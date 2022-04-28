/*
This is the search page for the application which holds the search bar component.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/
import SearchBar from "../mod_components/SearchBar.js";
import "../style/Search.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        if (loggedInUser) {
            nav("/search");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

    }, []);

    return (
    <>
        <SearchBar />
    </>
    );
}