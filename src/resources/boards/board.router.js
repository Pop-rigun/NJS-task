const router = require('express').Router();
const taskRouter = require('../tasks/task.router');
const boardService = require('./board.service');
const Board = require('./board.model');
const { NotFoundError } = require('../../common/errors');

router.use('/:boardId/tasks', taskRouter);

router.route('/').get(async (req, res) => {
  const tasks = await boardService.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await boardService.get(req.params.id);
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
  const task = new Board({ ...req.body });
  await boardService.create(task);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const updatedBoard = await boardService.update(id, req.body);
  res.json(updatedBoard);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await boardService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
