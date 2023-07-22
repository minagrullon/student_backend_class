const express = require("express");
const controller = express.Router();
const studentData = require("../studentData");

// get all students
controller.get("/", (req, res) => {
  const { start, limit } = req.query;

  if (start && limit) {
    const realStart = +start - 1;

    const rangeSum = +start + +limit;

    const realLimit =
      rangeSum > studentData.students.length
        ? studentData.students.length - realStart
        : +limit;

    let rangeArr = Array.from({ length: realLimit }, (v, i) => +realStart + i);

    const limitedResponse = rangeArr.map((num) => studentData.students[num]);

    res.status(200).json({ limitedResponse });
  } else {
    // send all students as json
    res.json({ studentData });
  }
});

// get student by id
controller.get("/:id", (req, res) => {
  // send the student that matches the id
  const { id } = req.params;

  const idNum = +id;

  try {
    if (!Number.isInteger(idNum)) {
      throw new Error("Invalid id type: Must be a number");
    }

    // if id is number , but it is not found, send a message telling the user 'no student with that id is not found'
    if (id) {
      const found = studentData.students.find((student) => student.id === id);

      if (!found) {
        throw new Error("Student not found");
      }
      res.status(200).json({ found });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = controller;
