var express = require("express");
var app = express();
var router = express.Router();
var cors = require("cors");
var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

require("./models/db");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

var authMiddleware = require('./middleware/jwt.auth');

var authRoutes = require("./routes/authRoute");


app.get("/", function (req, res) {
  res.redirect("login");
});

app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server on port");
});
