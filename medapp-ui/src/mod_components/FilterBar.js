/*
This page is the for the filtering feature which allows for the user to filter medicaitons by what they 
are designed to treat. The filtering system will only filter by basic treatment.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BsFillFilterCircleFill } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import PrescribeButton from "./PrescribeButton";
import MedService from "../Service/Med.service";
import "../style/FilterBar.css";

export default function FilterBar() {

    const [treatment, setTreatment] = useState("Pain");
    const [searchRet, setSearchRet] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();

        MedService.getByTreatment(treatment)
            .then((response) => {
                fillSearch(response.data);
            })
            .catch((err) => {
                console.log("Error: " + err);
            })
    }

    function fillSearch(response) {
        
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

    }

    const renderCard = (card, index) => {
        return(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>
                    <Link to="/medicinepage">{card.medName}</Link>
                    </Card.Title>
                    <Card.Text id={card.id}>
                        {card.brandName}
                    </Card.Text>
                    <PrescribeButton id={card.id}/>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <div className="treDiv">
                <h2 className="treHed">Filter</h2>
                <h6>Please choose a filter for treatment</h6>
                <Form className="tBar" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicSearch">
                        <Form.Control 
                            as="select"
                            onChange={({ target }) => setTreatment(target.value)}
                        >
                            <option value="pain">Pain</option>
                            <option value="diabetes">Diabetes</option>
                            <option value="indigestion">Indigestion</option>
                            <option value="impotence">Impotence</option>
                            <option value="lowers blood pressure">High blood pressure</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Filter <BsFillFilterCircleFill /></Button>
                </Form>
            </div>
            <div className="seaDiv">
                {searchRet.map(renderCard)}
            </div>
        </>
    )
};