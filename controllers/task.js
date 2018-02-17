const Task = require('../models/Task');
const Lessons = require('../models/Lessons');
const request = require('request');

/**
 * GET /admin/task-form
 * New Task page.
 */
exports.getNewTask = (req, res) => {
    Lessons.find({}, (err, lessons) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('admin/tasks/task-form', {
        title: 'New Task Page',
        lessons: lessons
    });
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
        //console.log(req.body);
        //console.log(task);
        res.redirect('/admin/task-form');
    });
};

/**
 * *
 * GET /admin/lesson/:LessonId
 * Get lessons by id
 */
exports.getLessonById = (req, res) => {
    Lessons.findById(req.params.LessonId, (err, lessons) => {
        if (err) {
            return res.status(500).send(err);
        }
        //console.log(lessons);
        if (!lessons) return res.send('not found');
        req.flash('Lesson title', lessons.name);
        req.flash('Lesson description', lessons.description);
        Task.find({lessons:lessons._id}, (err, task) => {
            if (err) {
                return res.status(500).send(err);
            }
            //console.log(task);
            res.send({name: lessons.name, description: lessons.description, results: task});
        });
    });
}

/**
 * *
 * GET /admin/task/:TaskId
 * Get tasks by id
 */
exports.getTaskById = (req, res) => {
    Task.findById(req.params.TaskId, (err, task) => {
        if (err) {
            return res.status(500).send(err);
        }
        //console.log(task);
        res.send({name: task.name, description: task.description});
});
}

exports.postCheckSolution = (req, res) => {
    // request.post('http://78.46.208.140:3031', {solution:res.body.solution, test:res.body.test});
    request.post({
            url: 'http://78.46.208.140:3031',
            body: JSON.stringify({solution: req.body.solution, test: req.body.test})
        },
        function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
            res.send(body);
        }
    );
}


