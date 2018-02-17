const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Lesson = require('../models/Lessons');

exports.getAdmin = (req, res) => {
    // if (req.user) {
    //   return res.redirect('/');
    // }
    res.render('admin/admin', {
        title: 'adding lesson'
    });
};

exports.getLessonsForm = (req, res) => {
    // if (req.user) {
    //   return res.redirect('/');
    // }
    res.render('admin/lessons/lesson-form', {
        title: 'adding lesson'
    });
};

exports.postLessons = (req, res) => {
    const lesson = new Lesson({
        name: req.body.lesson_name,
        description: req.body.lesson_description
    })
    
    lesson.save((error) => {
        res.send()
    })
};


exports.getLessons = (req, res) => {
    Lesson.find({},(error, result) => {
        if(error) return res.send(error) 
        // res.send(result);
        res.render('lessons/lessons', {
            lessons: result
        });
    })
};

