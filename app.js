//basic Libery import

const express = require("express");

const router = require("./src/routes/api");

//call app
const app = new express();
//security npm libery import

const helmet = require("helmet");

const hpp = require("hpp");

const cors = require("cors");

const mongoose = require("mongoose");

const { default: rateLimit } = require("express-rate-limit");

app.use(cors());
//security implementation

app.use(helmet());

app.use(hpp());

//security perpash that manin cause client never push that app/ wev "20mb"

app.use(express.json({ limit: "20mb" }));

const limiter = rateLimit({ windowMS: 158 * 60 * 1000, max: 3000 });

app.use(limiter);

app.use(express.urlencoded({ extended: false }));

//connet mongoose

//mongoDB compass r localhost conection string/and DATABASH NAME
let URL = "mongodb://localhost:27017/todo-list-project";

let OPTION = { user: "", pass: "", autoIndex: true };

mongoose
  .connect(URL, OPTION)
  .then((res) => {
    console.log("Database connected");
  })

  .catch((err) => {
    console.log("Database connect fail");
  });

//route implement basic url

app.use("/api", router);

//if not find  url path
app.use("*", (req, res) => {
  res.status(404).json({ data: "not found" });
});

module.exports = app;
