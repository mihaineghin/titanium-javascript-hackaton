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
