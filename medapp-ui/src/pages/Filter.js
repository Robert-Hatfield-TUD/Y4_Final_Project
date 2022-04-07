import FilterBar from "../mod_components/FilterBar.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Filter() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();


        //console.log(loggedInUser);
        if (loggedInUser) {
            //console.log("User already logged in!")
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