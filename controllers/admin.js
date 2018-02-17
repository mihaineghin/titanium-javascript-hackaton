const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Admin = require('../models/User');

exports.getAdmin = (req, res) => {
    // if (req.user) {
    //   return res.redirect('/');
    // }
    res.render('admin', {
      title: 'admin'
    });
  };