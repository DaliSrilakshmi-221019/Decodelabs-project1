const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.post("/predict", async (req, res) => {
  const { name, cgpa, aptitude, communication } = req.body;

  if (!name || !cgpa || !aptitude) {
    return res.status(400).json({
      message: "Please fill all required fields"
    });
  }

  const prediction =
    cgpa >= 7.5 && aptitude >= 70 && communication >= 7
      ? "Placed"
      : "Not Placed";

  const student = await Student.create({
    name,
    cgpa,
    aptitude,
    communication,
    prediction
  });

  res.status(201).json(student);
});

router.get("/predictions", async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });

  res.json(students);
});

module.exports = router;