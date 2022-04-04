import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
//import { MdAccountBox } from "react-icons/md";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";

var isLogged = true

const handleLogout = () => {
    localStorage.clear();
    isLogged = false;
};

export default function NavbarUser() {
    const [show, setShow] = useState(false);
    const mClose = () => setShow(false);
    const mShow = () => setShow(true); 

    return (
    <>
        <BootstrapNavbar className="navbar">
        <Container fluid>
                <IoMenu className="icon" onClick={mShow} size="30" />
                <BootstrapNavbar.Brand>
                    <Link to="/">
                        <p>Medapp</p>
                    </Link>
                    <Offcanvas show={show} start className="side">
                        <Offcanvas.Header>
                            <VscChromeClose className="cIcon" size="30" onClick={mClose}/>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Link to="/" onClick={mClose}>
                                Medapp
                            </Link>
                            <li>
                                <Link to="/" onClick={mClose}>
                                    Home
                                </Link>
                            </li> 
                                <li>
                                    <Link to="Search" onClick={mClose}>
                                        Search
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/medicineinteraction" onClick={mClose}>
                                        Medication Interactions 
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/userpage" onClick={mClose}>
                                        User Profile
                                    </Link>
                                 </li>
                            <li>
                                <Link to="/login" onClick={function(event){ handleLogout(); mClose(); }}>
                                    Logout
                                </Link>
                            </li>
                        </Offcanvas.Body>
                    </Offcanvas>
                </BootstrapNavbar.Brand>
            </Container>
        </BootstrapNavbar>
    </>
    );
}