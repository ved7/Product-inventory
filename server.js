// #1 initialisation

const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
require("dotenv").config();

// #2 mongodb connection code

require("./models/dataBase"); //this js file holds the mongodb database connection string
const app = express();

// #3 handlebar access

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

// #4 importing the controlller js module

const Controller = require("./controllers/controllerFile");

// #5 global middleware : order matters
// middleware for parsing bodies from URL

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

// #6 returns middleware that only parses json

app.use(bodyparser.json());

// #7 setting up the views and using template engine hbs

app.set("views", path.join(__dirname, "frontend/views/"));

// #8 register hbs as the template engine specifying layout and its directory

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/frontend/views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

// #9 Using hbs as the default view engine

app.set("view engine", "hbs");

// #10 listen the connections on the specified host and port

app.listen(process.env.PORT || 3060, () => {
  console.log(`App listening at port : 3060`);
});

// #11 Controller file as middleware

app.use("/product", Controller);
