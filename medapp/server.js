const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("1234"));

var corsOptions = {
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Working" });
});

const PORT = process.env.PORT || 8080;

require("./app/routes/user.routes.js")(app);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connection to database: Passed");
    })
    .catch(err => {
        console.log("Connection to database: Failed, ", err);
        process.exit();
    });