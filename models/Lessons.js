
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const lessonsSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
  }, { timestamps: true });

const Lesson = mongoose.model('lesson', lessonsSchema);

module.exports = Lesson;
