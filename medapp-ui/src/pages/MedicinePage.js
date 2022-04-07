//Page for each medication
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MedService from "../Service/Med.service";

export default function MedicinePage() {

    const nav = useNavigate();
    let { id } = useParams(); 
    const [resultData, setResultData] = useState({});

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        document.getElementById("medMg").innerHTML = "";
        document.getElementById("medActIng").innerHTML = "";
        document.getElementById("medTabDes").innerHTML = "";
        document.getElementById("medTakeFor").innerHTML = "";
        document.getElementById("medName").innerHTML = "";
        document.getElementById("medBName").innerHTML = "";
        document.getElementById("medDes").innerHTML = "";
        document.getElementById("medTakeMeth").innerHTML = "";
        document.getElementById("sE").innerHTML = "";
        document.getElementById("medAvoid").innerHTML = "";

        //console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User already logged in!")
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

        MedService.get(id)
        .then((response) => {
            //console.log(response.data);
            var resObj = response.data;
            setResultData(resObj);
            fillData(resObj);

        })
        .catch((err) => {
            console.log("Error: " + err);
        })
    }, []);

    function fillData(obj) {
        //console.log("Fill data: " + obj.sideEffect);

        document.getElementById("medName").innerHTML = obj.medName;
        document.getElementById("medBName").innerHTML = obj.brandName;
        document.getElementById("medDes").innerHTML = obj.description;
        document.getElementById("medTakeMeth").innerHTML = obj.takeMethod;
        
        for (var i = 0; i < (obj.sideEffect).length; i++) {
            document.getElementById("sE").innerHTML += `<li>${obj.sideEffect[i]}</li>`;
        }

        document.getElementById("medMg").innerHTML = obj.mg;
        document.getElementById("medActIng").innerHTML = obj.activeIng;
        document.getElementById("medTabDes").innerHTML = obj.tabDescrip;
        document.getElementById("medTakeFor").innerHTML = obj.takenFor;

        for (var i = 0; i < (obj.noTake).length; i++) {
            document.getElementById("medAvoid").innerHTML += `<li>${obj.noTake[i]}</li>`;
        }
    }

    return(
        <>
            <div>
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Title id="medName">{resultData.medName}</Card.Title>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Brand</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medBName"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medDes"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">How to take</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medTakeMeth"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Side effects</Card.Subtitle>
                        <ul id="sE">
                        </ul>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">MG</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medMg"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Active Ingredient</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medActIng"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Medication type</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medTabDes"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Treatment</Card.Subtitle>
                        <ListGroup variant="flush">
                            <ListGroup.Item id="medTakeFor"></ListGroup.Item>
                        </ListGroup>
                        <br></br>
                        <Card.Subtitle className="mb-2 text-muted">Avoid taking with</Card.Subtitle>
                        <ul id="medAvoid"></ul>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}