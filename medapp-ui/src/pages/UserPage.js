// User profile page
import UserService from "../Service/UserService";
import Med from "../Service/Med.service";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../style/UserPage.css";
import UserPic from "../images/user.png";
import PrescribeButton from "../mod_components/PrescribeButton.js";

export default function UserPage() {

    const [preReturn, setPreReturn] = useState([]);
    const nav = useNavigate();

    useEffect(() => {

        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        //console.log(loggedInUser);
        if (loggedInUser) {
            console.log("User already logged in!")
            nav("/userpage");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

        setTimeout(function() {
            var x = JSON.parse(localStorage.getItem("user"));
            //console.log(x.value);

            var email = x.value;
            //console.log(email);

            UserService.getByEmail(email)
                .then((response) => {
                    //console.log(response.data);
                    document.getElementById("username").innerHTML = response.data[0].username;
                    document.getElementById("age").innerHTML = response.data[0].age;
                })
                .catch((err) => {
                    console.log("Error: " + err);
                })

            var userDets = x.value;

            Med.getByPerscribed(userDets)
                .then((response) => {
                    console.log("Prescribed meds: ");
                    console.log(response);

                    setPreReturn(response.data);
                })
                .catch((err) => {
                    console.log("Error: " + err);
                })
        }, 1000);
    }, []);

    const renderCard = (card, index) => {
        return(
            <Card style={{ width: '18rem' }} key={index}>
                <Card.Body>
                    <Card.Title>
                    <Link to={`/medicinepage/${card.id}`}>{card.medName}</Link>
                    </Card.Title>
                    <Card.Text id={card.id}>
                        {card.brandName}
                    </Card.Text>
                    <PrescribeButton id={card.id}/>
                </Card.Body>
            </Card>
        )
    }

    return(
    <>
        <div className="useDiv">
            <h2>User profile</h2>
            <CardGroup>
            <Card className="userDetail">
                <Card.Body>
                    <Card.Title>
                        <h4>Username: </h4><span id="username"></span>
                    </Card.Title>
                    <Card.Text>
                        Age: <span id="age"></span>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="imgCard">
                <Card.Img className="uPic" variant="top" src={UserPic} />
            </Card>
            </CardGroup>
            <br></br>
            <br></br>
            <h3>Prescribed Medicaitons</h3>
            {preReturn.map(renderCard)}
        </div>
    </>
    );
}