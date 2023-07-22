const express = require("express");

const app = express();

const studentController = require("./controllers/StudentController");

app.use("/students", studentController);

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello hello");
});

module.exports = app;
