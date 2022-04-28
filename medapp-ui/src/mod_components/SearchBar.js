/*
This page holds the search bar for the application which will allow the user to search for a medicaiotn 
by either the name or if the user does not know the full name the user can just insert a partial 
spelling of the name and then it will return the medicaitons that are matched with it.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "react-bootstrap/esm/Button";
import PrescribeButton from "./PrescribeButton";
import "../style/SearchBar.css"
import MedService from "../Service/Med.service";

export default function Search() {

    const [medName, setMedName] = useState("");
    const [searchRet, setSearchRet] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        MedService.getByMedName(medName)
            .then((response) => {
                fillSearch(response.data);
            })
            .catch((err) => {
                console.log("Error: " + err);
            })
    }

    function fillSearch(response) {

        document.getElementById("seaSearch").innerHTML = "";

        var searchReturn = [];
        var temp1 = "";
        var temp2 = "";
        var temp3 = "";

        for(var i = 0; i < response.length; i++) {

            temp1 = response[i].medName;
            temp2 = response[i].brandName;
            temp3 = response[i].id;
            
            searchReturn.push({ medName: temp1, brandName: temp2, id: temp3 });
        }

        setSearchRet(searchReturn);

        if(searchReturn[0] === undefined) {
            document.getElementById("seaSearch").innerHTML = "Sorry there are no results for your search.";
        }

    }

    const renderCard = (card, index) => {
        return(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body id={card.id}>
                    <Card.Title>
                    <Link to={`/medicinepage/${card.id}`}>{card.medName}</Link>
                    </Card.Title>
                    <Card.Text>
                        {card.brandName}
                    </Card.Text>
                    <PrescribeButton id={card.id}/>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <div className="seaDiv">
                <h2 className="seaHed">Search</h2>
                <h6>This search bar can be used to find any medication just from some of the letters included in it.</h6>
                <Form className="sBar" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicSearch">
                        <Form.Control
                            type="text"
                            value={medName}
                            placeholder="Search..."
                            onChange={({ target }) => setMedName(target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit"><AiOutlineSearch /></Button>
                </Form>
            </div>
            <div className="seaDiv">
                {searchRet.map(renderCard)}
                <p id="seaSearch"></p>
            </div>
        </>
    )
};