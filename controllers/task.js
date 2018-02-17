const Task = require('../models/Task');
const Lessons = require('../models/Lessons');

/**
 * GET /admin/task-form
 * New Task page.
 */
exports.getNewTask = (req, res) => {
    res.render('admin/tasks/task-form', {
        title: 'New Task Page' 
    });
};

/**
 * POST /admin/task-form/addnewtask
 * Add new task.
 */
exports.postNewTask = (req, res) => {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('description', 'Description cannot be blank').notEmpty();
    req.assert('tests', 'Tests cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/admin/task-form');
    }

    const task = new Task({
        name: req.body.name,
        lessons: req.body.lessons,
        description: req.body.description,
        tests: req.body.tests
    });

    task.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(req.body);
        console.log(task);
        res.redirect('/admin/task-form');
    });
};

/**
 * *
 * GET /admin/lesson/:LessonId
 * Get lessons by id
 */
exports.getLessonById = (req, res) => {
    Lessons.findById(req.params.lessonsid, (err, lessons) => {
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
        });
    });
}