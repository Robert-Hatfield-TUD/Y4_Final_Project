import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "react-bootstrap/esm/Button";
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
        //console.log(response);

        //console.log(response.length);
        var searchReturn = [];
        var temp1 = "";
        var temp2 = "";
        var temp3 = "";

        for(var i = 0; i < response.length; i++) {
            //console.log(response[i].medName);

            temp1 = response[i].medName;
            temp2 = response[i].brandName;
            temp3 = response[i].id;
            //console.log(temp1);
            
            searchReturn.push({ medName: temp1, brandName: temp2, id: temp3 });
        }

        //console.log("choose your poison: " + searchReturn[0].id);

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
            </div>
        </>
    )

};