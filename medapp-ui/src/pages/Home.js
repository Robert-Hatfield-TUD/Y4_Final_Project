/*
This is the home page which is displayed to each user after they have logged into the application.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/


import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CargGroup from "react-bootstrap/CardGroup";
import MedService from "../Service/Med.service";
import PrescribeButton from "../mod_components/PrescribeButton";
import "../style/Home.css";

export default function Home() {

    const nav = useNavigate();
    const [medResult, setMedResult] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        if (loggedInUser) {
            console.log("User already logged in!")
            nav("/");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

        MedService.getAll()
            .then((response) => {
                setMedResult(response.data);
            })
            .catch((err) => {
                console.log("Error: " + err);
            })

    }, []);

    const renderCard = (card, index) => {
        return(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>
                    <Link to={`/medicinepage/${card.id}`}>{card.medName}</Link>
                    </Card.Title>
                    <Card.Text id={card.id}>
                        {card.brandName}
                    </Card.Text>
                    <PrescribeButton id={card.id}/>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <div className="homeHold">
                <h2>Home</h2>
                <br></br>
                <CargGroup>
                    {medResult.map(renderCard)}
                </CargGroup>
            </div>
        </>
    );
}