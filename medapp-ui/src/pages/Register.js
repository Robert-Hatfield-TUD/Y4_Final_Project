/*
This is the registration page of the application which allows for a user to create an account for the 
application and it alows the user to redirect to the login page if they already have an account.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/
import UserService from "../Service/UserService";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/Register.css";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        if (loggedInUser) {
            console.log("User already logged in!")
            nav("/");
        }
        else if(!loggedInUser) {
            nav("/register");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        let data = {
            email: email,
            username: username,
            password: password,
            age: age,
        }

        UserService.create(data)
            .then((response) => {
                //console.log("Data: " + response.data); For testing upon creation of user
                alert("User created please log in to confirm");
                nav("/login");
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    }
    
    return(<>

        <div className="regDiv">
        <h2 className="regHead">Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                       type="email" 
                       value={email} 
                       placeholder="Enter email" 
                       onChange={({ target }) => setEmail(target.value)} 
                       required
                   />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        placeholder="Enter username"
                        onChange={({ target }) => setUsername(target.value)} 
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        value={age}
                        placeholder="Enter age"
                        onChange={({ target }) => setAge(target.value)} 
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={({ target }) => setPassword(target.value)} 
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>

            <p>Don't have an account? <Link to="/login">Login here!!</Link></p>
        </div>

    </>
    );
}