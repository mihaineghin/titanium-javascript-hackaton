const Task = require('../models/Task');

/**
 * GET /admin/task-form
 * New Task page.
 */
exports.getNewTask = (req, res) => {
    res.render('admin/task-form', {
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
        description: req.body.description,
        tests: req.body.tests
    });

    task.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/admin/task-form');
    });
};