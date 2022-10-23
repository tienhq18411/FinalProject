var express = require("express");
var app = express();
var router = express.Router();
var cors = require("cors");
var dotenv = require("dotenv");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static(__dirname + '/public'));
app.use('/upload', express.static('uploads'))

var hbs = require("hbs");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial");


require("./models/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cors());

var authRoutes = require("./routes/authRoute");
var adminRoutes = require("./routes/adminRoute");
var hostRoutes = require("./routes/hostRoute");
var userRoutes = require("./routes/userRoute");

app.get("/", function (req, res) {
  res.redirect("auth/home");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/host", hostRoutes);
app.use("/user", userRoutes);

var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log("Server is running on port: " + PORT);
