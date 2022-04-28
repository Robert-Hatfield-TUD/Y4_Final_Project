/*
This page is the display for the filter page which displays the filter bar component.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import FilterBar from "../mod_components/FilterBar.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        if (loggedInUser) {
            nav("/filter");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

    }, []);

    return(
        <>
            <FilterBar />
        </>
    );
}