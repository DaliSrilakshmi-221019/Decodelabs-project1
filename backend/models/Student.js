const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: String,
    cgpa: Number,
    aptitude: Number,
    communication: Number,
    prediction: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);