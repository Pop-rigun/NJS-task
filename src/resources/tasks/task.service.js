const { NotFoundError } = require('../../common/errors');
const tasksRepo = require('./task.repository');

const getAll = async () => tasksRepo.getAll();

const create = async task => tasksRepo.create(task);

const get = async id => {
  const task = await tasksRepo.get(id);
  if (!task) {
    throw new NotFoundError();
  }
  return task;
};

const getByBoardId = async boardId => tasksRepo.getByBoardId(boardId);
const getByUserId = async userId => tasksRepo.getByUserId(userId);
const update = async (id, options) => {
  /* eslint-disable no-unused-vars */
  const { _id, ...rest } = options;
  return tasksRepo.update(id, rest);
};

const remove = async id => tasksRepo.remove(id);

const unassign = async id => {
  return tasksRepo.update(id, { userId: null });
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
  getByBoardId,
  unassign,
  getByUserId
};
