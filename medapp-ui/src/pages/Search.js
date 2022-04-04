// Search page
import SearchBar from "../mod_components/SearchBar.js";
import "../style/Search.css";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();


        //console.log(loggedInUser);
        if (loggedInUser) {
            //console.log("User already logged in!")
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