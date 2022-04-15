import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Service/UserService";
import "../style/Login.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

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
    }, []);

    const handleSubmit = async e => {

        console.log("test 1");

        console.log("test 2");

        e.preventDefault();

        let data = {
            email: email,
            password: password,
        };

        var user = "";

        UserService.login(data)
            .then((response) => {
                console.log("Status: " + response.status);
                console.log("Data: " + response.data);
                user = JSON.stringify(response.data);
                user = JSON.parse(user)
                //setUser(user);
                //localStorage.setItem('user', user);
                setLocWithExpiration("user", user, 500);
                console.log("server: " + response.data + ", Stringify: " + user);
                nav("/");
            })
            .catch((error) => {
                console.log("Error: " + error);
            });

    };

    function setLocWithExpiration(key, value, ttl) {
        const now = new Date();
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }
        localStorage.setItem(key, JSON.stringify(item));
    }

    return (
        <>
            <div className="logDiv">
                <h2 className="logHead">Login</h2>
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
                    <Button variant="primary" type="submit">Login</Button>
                </Form>

                <p>Don't have an account? <Link to="/register">Sign up here!!</Link></p>
            </div>
        </>
    );
}