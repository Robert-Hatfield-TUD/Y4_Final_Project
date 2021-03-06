/*
This is an error page that displays when the user navigates to a non-existent page which will 
redirect the user to the home page after 10 seconds

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { BiError } from "react-icons/bi";
import "../style/ErrorP.css";

export default function ErrorP() {

    const nav = useNavigate();

    useEffect(() => {

        setTimeout(function(){
            nav("/");
        }, 10000)

    }, []);

    return(
    <>
    <Container className="eContain">
        <BiError size={50}/>
        <h1>Oh no! This page means you have been directed to a non-exisitng page. You will be redirected in 10 seconds.</h1>
    </Container>
    </>
    );
}