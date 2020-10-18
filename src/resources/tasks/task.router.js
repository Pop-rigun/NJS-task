const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');
const { customError, catchError } = require('../../common/error');

router.route('/').get(catchError(async (req, res) => {
  const tasks = await tasksService.getAllTasks(req.boardId);
  return res.json(tasks);
}));

router.route('/:id').get(catchError(async (req, res, next) => {
    const task = await tasksService.getTaskById(req.boardId, req.params.id);
    if (task) {
      return res.json(Task.toResponse(task));
    } else {
    throw new customError(404, 'Task not found');
  }
}));

router.route('/:id').put(catchError(async (req, res, next) => {
    const task = await tasksService.updateTask(
      req.boardId,
      req.params.id,
      req.body
    );
    if (task) {
      return res.json(Task.toResponse(task));
    } else {
      throw new customError(400, 'Bad request');
    }
}));

router.route('/').post(catchError(async (req, res) => {
  const task = await tasksService.createTask(req.boardId, req.body);
  if(task){
  return res.json(Task.toResponse(task));
  } else {
    throw new customError(400, 'Bad request');
  }
}));

router.route('/:id').delete(catchError(async (req, res, next) => {
    const task = await tasksService.removeTask(req.params.id);
    if (task) {
      return res.json(Task.toResponse(task));
    }
    else {
      throw new customError(404, 'Task not found');
    }
}));

module.exports = router;
