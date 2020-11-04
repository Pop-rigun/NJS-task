const router = require('express').Router({ mergeParams: true });
const { NotFoundError } = require('../../common/errors');
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.id);
    res.json(task);
  } catch (e) {
    switch (e.constructor) {
      case NotFoundError: {
        res.sendStatus(404);
        break;
      }
      default: {
        res.sendStatus(500);
      }
    }
  }
});

router.route('/').post(async (req, res) => {
  const task = new Task({ ...req.body, boardId: req.params.boardId });
  await taskService.create(task);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const updatedTask = await taskService.update(id, req.body);
  res.json(updatedTask);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await taskService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
