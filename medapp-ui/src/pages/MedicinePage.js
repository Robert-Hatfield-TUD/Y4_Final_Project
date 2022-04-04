//Page for each medication
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function MedicinePage() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();


        //console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User already logged in!")
            nav("/medicinepage");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }
    }, []);

    return(<>
    <p>This is the medicine page</p>
    </>);
}