/*
This page is to show the interactions between two chosen medicaitons which checks to see if either the 
name or active ingredient are included.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
 */

import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MedService from "../Service/Med.service.js";
import "../style/MedicineInteraction.css";

export default function MedicineInteractionCheck () {

    const [medInfo, setMedInfo] = useState([]);
    const [checkValue, setCheckValue] = useState([]);
    const [firstCheck, setFirstCheck] = useState("");
    const [secondCheck, setSecondCheck] = useState("");

    useEffect(() => {

        MedService.getAll()
        .then((response) => {
            
            setMedInfo(response.data);
            
            return(response.data);
        })
        .then((medInfo) => {
            
            fillData(medInfo);
        })
        .catch((err) => {
            console.log("Error: " + err);
        })

    }, []);

    function fillData(medInfo) {

        var searchReturn = [];
        var temp1 = "";
        var temp2 = [];
        var temp3 = "";

        for(var i = 0; i < medInfo.length; i++) {

            temp1 = medInfo[i].medName;
            temp2 = medInfo[i].noTake;
            temp3 = medInfo[i].activeIng;

            searchReturn.push({ medName: temp1, noTake: temp2, activeIng: temp3});

        }

        setCheckValue(searchReturn);
        setFirstCheck(searchReturn[0].medName);
        setSecondCheck(searchReturn[0].medName);

    }

    function showInteraction() {

        document.getElementById("inter").innerHTML = "";

        var mName = "";
        var aIng = "";
        var nTake = [];
        var pos = 0;

        for(var i = 0;i < checkValue.length; i++) {
            if(firstCheck === checkValue[i].medName) {
                
                mName = firstCheck.toLowerCase();
                aIng = checkValue[i].activeIng;
                nTake = checkValue[i].noTake;
                pos = i;
            }
        }

        console.log(pos + ": " + aIng + ": " + nTake);

        for(var j = 0; j < checkValue.length; j++) {
            if(secondCheck === checkValue[j].medName) {
                for(var k = 0; k < nTake.length; k++) {
                    if(secondCheck.toLowerCase() === nTake[k] || checkValue[j].activeIng === nTake[k]) {
                        document.getElementById("inter").innerHTML = "These medications can not be taken together however please do not take this as a definite answer, always visit a GP or doctor if you are unsure about taking medications.";
                    }
                }
            }
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        showInteraction();
    }

    const renderOption = (option, index) => {
        return(
            <option value={option.medName} key={index}>{option.medName}</option>
        )
    }

    return (
        <>
            <div className="intDiv">
                <h2>Medication interaction checker</h2>
                <h6>Please choose two medications in the selectors below.</h6>
                <Form className="intBar" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicCheck">
                        <Form.Control 
                        as="select"
                        onChange={({ target }) => setFirstCheck(target.value)}
                        >
                            {checkValue.map(renderOption)}
                        </Form.Control>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="forBasicCheck2">
                        <Form.Control
                        as="select"
                        onChange={({ target }) => setSecondCheck(target.value)}
                        >
                            {checkValue.map(renderOption)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Check interactions</Button>
                </Form>
                <br></br>
                <p id="inter"></p>
            </div>
        </>
    )
}