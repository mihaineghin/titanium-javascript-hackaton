const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  tests: String,
}, { timestamps: true });

const Task = mongoose.model('User', taskSchema);

module.exports = Task;
