const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  lessons: String,
  description: String,
  tests: String,
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
