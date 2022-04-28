/*
This is the page which returns the navigation bar which is displayed on each page of the application to
allow for the user to navigate the application.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { BiHomeAlt, BiSearch, BiFilter } from "react-icons/bi";
import { CgPill } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../style/Navbar.css";

const handleLogout = () => {
    localStorage.clear();
};

export default function Navbar() {
    const [show, setShow] = useState(false);
    const mClose = () => setShow(false);
    const mShow = () => setShow(true); 

    return (
    <>
        <BootstrapNavbar className="navbar">
        <Container fluid className="sideMain">
                <IoMenu className="icon" onClick={mShow} size="30" />
                <BootstrapNavbar.Brand>
                    <Link to="/">
                        <h2>Medapp</h2>
                    </Link>
                    <Offcanvas show={show} className="side">
                        <Offcanvas.Header>
                            <VscChromeClose className="cIcon" size="30" onClick={mClose}/>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Link to="/" style={{textDecoration: "none"}} onClick={mClose}>
                                <h4>Medapp</h4>
                            </Link>
                            <ul style={{listStyleType: "none"}}>
                            <li className="medTop">
                                <Link to="/" style={{textDecoration: "none"}} onClick={mClose}>
                                    <h5><BiHomeAlt size={22} /> Home</h5>
                                </Link>
                            </li>
                                <li className="medTop">
                                    <Link to="Search" style={{textDecoration: "none"}} onClick={mClose}>
                                        <h5><BiSearch size={22} /> Search</h5>
                                    </Link>
                                </li>
                                <li className="medTop">
                                    <Link to="/filter" style={{textDecoration: "none"}} onClick={mClose}>
                                        <h5><BiFilter size={22} /> Filter</h5>
                                    </Link>
                                </li>
                                <li className="medTop">
                                    <Link to="/medicineinteraction" style={{textDecoration: "none"}} onClick={mClose}>
                                        <h5><CgPill size={22} /> Medication Interactions</h5>
                                    </Link>
                                </li>
                                <li className="medTop">
                                    <Link to="/userpage" style={{textDecoration: "none"}} onClick={mClose}>
                                        <h5><AiOutlineUser /> User Profile</h5>
                                    </Link>
                                </li>
                            <li className="medTop">
                                <Link to="/login" style={{textDecoration: "none"}} onClick={function(event){ handleLogout(); mClose(); }}>
                                    <h5><FiLogOut size={24}/> Logout</h5>
                                </Link>
                            </li>
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </BootstrapNavbar.Brand>
            </Container>
        </BootstrapNavbar>
    </>
    );
}