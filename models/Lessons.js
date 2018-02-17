<<<<<<< HEAD
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const lessonsSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
=======
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const lessonsSchema = new mongoose.Schema({
    name: { type: String},
    description: { type: String},
>>>>>>> be879d68a90b2976b19c58d927d72e6f71f1596d
  }, { timestamps: true });