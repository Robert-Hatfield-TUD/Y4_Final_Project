import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
//import { MdAccountBox } from "react-icons/md";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function NavbarGuest() {
    const [show, setShow] = useState(false);
    const mClose = () => setShow(false);
    const mShow = () => setShow(true); 

    return (
    <>
        <BootstrapNavbar className="navbar">
        <Container fluid>
                <IoMenu className="icon" onClick={mShow} size="30" />
                <BootstrapNavbar.Brand>
                    <Link to="/login">
                        <p>Medapp</p>
                    </Link>
                    <Offcanvas show={show} start className="side">
                        <Offcanvas.Header>
                            <VscChromeClose className="cIcon" size="30" onClick={mClose}/>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Link to="/login" onClick={mClose}>
                                Medapp
                            </Link>                     
                            <li>
                                <Link to="/login"  onClick={mClose}>
                                    Login
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