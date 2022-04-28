/*
This page is to add a prescription button to each searched medicaiton so that a user can add the medicaiton
to their prescribed list from any of the points where medicaiton is displayed.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React from "react";
import Button from "react-bootstrap/Button";
import { BsClipboard } from "react-icons/bs"
import MedService from "../Service/Med.service";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function prescribe(id) {

    MedService.get(id)
        .then((response) => {

            var x = JSON.parse(localStorage.getItem("user"));
            var email = x.value;

            var medObj = {};
            medObj = response.data;

            var prescribedYes = 0;
            var splice = 0;

            for(var i = 0; i < (medObj.userDets).length; i++) {

                if(email === medObj.userDets[i]) {
                    splice = i;
                    prescribedYes++;
                }

            }

            if(prescribedYes > 0) {
                (medObj.userDets).splice(splice, 1);

                let data = {
                    medName: medObj.medName,
                    brandName: medObj.brandName,
                    description: medObj.description,
                    takeMethod: medObj.takeMethod,
                    sideEffect: medObj.sideEffect,
                    mg: medObj.mg,
                    activeIng: medObj.activeIng,
                    medType: medObj.medType,
                    tabDescrip: medObj.tabDescrip,
                    takenFor: medObj.takenFor,
                    treatment: medObj.treatment,
                    noTake: medObj.noTake,
                    userDets: medObj.userDets
                }

                MedService.update(id, data)
                    .then((response) => {
                        //console.log(response); for error check on prescription update
                    })
                    .catch((err) => {
                        console.log("Error: " + err);
                    })
            }
            else if(prescribedYes === 0) {

                (medObj.userDets).push(email);

                let data = {
                    medName: medObj.medName,
                    brandName: medObj.brandName,
                    description: medObj.description,
                    takeMethod: medObj.takeMethod,
                    sideEffect: medObj.sideEffect,
                    mg: medObj.mg,
                    activeIng: medObj.activeIng,
                    medType: medObj.medType,
                    tabDescrip: medObj.tabDescrip,
                    takenFor: medObj.takenFor,
                    treatment: medObj.treatment,
                    noTake: medObj.noTake,
                    userDets: medObj.userDets
                }

                MedService.update(id, data)
                    .then((response) => {
                        //console.log(response); for error check on prescription update
                    })
                    .catch((err) => {
                        console.log("Error: " + err);
                    })
            }
        })
        .catch((err) => {
            console.log("Error: " + err);
        })
}

export default function PrescribeButton(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Button id="reactButton" variant="primary" onClick={() => {prescribe(props.id); handleShow();}}><BsClipboard /></Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Presciption updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Medication prescription has been updated
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal> 
        </>
    )
}