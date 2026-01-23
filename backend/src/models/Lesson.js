// src/models/Lesson.js
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  anchor: {
    type: String,
    required: true,
  },
});

const lessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sections: [sectionSchema],
}, {
  
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model("Lesson", lessonSchema);