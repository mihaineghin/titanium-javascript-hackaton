const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Lesson = require('../models/Lessons');
const Task = require('../models/Task');


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
    return res.redirect('/lessons');
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


/**
 * *
 * GET /admin/lesson/:LessonId
 * Get lessons by id
 */
exports.getLessonById = (req, res) => {
    Lesson.findById(req.params.LessonId, (err, lessons) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(lessons);
        req.flash('Lesson title', lessons.name);
        req.flash('Lesson description', lessons.name);
        Task.find({lessons:lessons._id}, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(task);
            req.flash('Task name', task.name);
            res.render('lessons/lesson', {
                lesson: lessons,
                tasks: task
            })
        });
    });
}

