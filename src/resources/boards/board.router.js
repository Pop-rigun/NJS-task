const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const taskRouter = require('../tasks/task.router');
const { customError, catchError } = require('../../common/error');

router.route('/').get(catchError( async (req, res) => {
  const boards = await boardService.getAllBoards();
  return res.json(boards.map(Board.toResponse));
}));

router.route('/:id').get(catchError(async (req, res, next) => {
    const board = await boardService.getBoardById(req.params.id);
    if (board){
    return res.json(board);
    }
    else
    {
      throw new customError(404, 'Board not found');
    }
}));

router.route('/').post(catchError(async (req, res) => {
  const board = await boardService.createBoard(req.body);
  if (board) {
    return res.json(board);
  } else {
    throw new customError(400, 'Bad request');
  }
}));

router.route('/:id').put(catchError(async (req, res, next) => {
    const board = await boardService.updateBoard(req.params.id, req.body);
    if (board) {
      return res.json(Board.toResponse(board));
    }else {
      throw new customError(400, 'Bad request');
    }
}));

router.route('/:id').delete(catchError(async (req, res) => {
    const board = await boardService.removeBoard(req.params.id);
    if (board) {
      return res.json(board);
    }
    else {
      throw new customError(404, 'Board not found');
    }
}));

router.use(
  '/:boardId/tasks',
  (req, res, next) => {
    req.boardId = req.params.boardId;
    next();
  },
  taskRouter
);

module.exports = router;
