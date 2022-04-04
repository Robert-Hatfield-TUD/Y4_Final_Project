// Homepage
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MedService from "../Service/Med.service";
import "../style/Home.css";
import Card from "react-bootstrap/Card";


export default function Home() {

    const nav = useNavigate();
    var medInfo;
    var divEnter = "";
    var divList = "";
    const [ medInf, setMedInf ] = useState("");
    const [visible, setVisible] = useState(false);
    var loads = 0;

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();


        //console.log(loggedInUser);
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
                //console.log(response.data)
                medInfo = response.data;
                //console.log(medInfo);
                //console.log(medInfo[0].medName);
                //assignMeds(medInfo);
                return(response.data);
            })
            .then((medInfo) => {
                assignMeds(medInfo);
            })
            .catch((err) => {
                console.log("Error: " + err);
            })

    }, []);

    function assignMeds(medInformation) {
        //console.log("Medical info: " + medInformation[0].medName);
        //console.log(medInformation.length);
        var i = 0;
        //console.log(me)

        //console.log("med list: " + medList);

        for(i = 0;i < 2;i++) {
            //console.log("Name: " + medInformation[i].medName); 

            divEnter += '<div className="medList">' +
                            '<p>Medication: ' + medInformation[i].medName + '</p>' +
                            '<p>Brand: ' + medInformation[i].brandName + '</p>' +
                            '<p>Medication Type: ' + medInformation[i].medType + '</p>' + 
                        '</div>';
        }

        //console.log(divEnter);
        divList = divEnter;
        setMedInf(divList);
        //console.log(medDiv);
        //console.log("test2: " + medInf);

    }

    function callCall() {
        document.getElementById("medLists").innerHTML = medInf;
        var x = document.getElementById("medLists");

        if(visible === false) {
            x.style.display = "block";
            setVisible(true);
        }
        else if(visible === true) {
            x.style.display = "none";
            setVisible(false);
        }
    } 

    return (
        <>
            <h2>Home</h2>
            <div className="homeHold">
                <button onClick={callCall}>See medications</button>
                <div className="meds1" id="medLists">
                </div>
            </div>
        </>
    );

}