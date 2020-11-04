const { NotFoundError } = require('../../common/errors');
const boardRepository = require('./board.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => boardRepository.getAll();

const create = async task => boardRepository.create(task);

const get = async id => {
  const board = await boardRepository.get(id);
  if (!board) {
    throw new NotFoundError();
  }
  return board;
};

const update = async (id, options) => {
  /* eslint-disable no-unused-vars*/
  const { _id, ...rest } = options;
  return boardRepository.update(id, rest);
};

const remove = async id => {
  const boardTasks = await taskService.getByBoardId(id);
  if (boardTasks) {
    const promises = boardTasks.map(t => taskService.remove(t.id));
    await Promise.all(promises);
  }
  return boardRepository.remove(id);
};

module.exports = { getAll, create, get, update, remove };
