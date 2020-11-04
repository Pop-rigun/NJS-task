const DB = require('../../common/inmemory_db');

const getAll = async () => {
  return DB.tasks;
};

const create = async task => {
  DB.tasks.push(task);
};

const get = async id => {
  return DB.tasks.find(u => u.id === id);
};

const getByBoardId = async boardId => {
  return DB.tasks.filter(t => t.boardId === boardId);
};

const getByUserId = async userId => {
  return DB.tasks.filter(t => t.userId === userId);
};

const update = async task => {
  const index = DB.tasks.findIndex(t => t.id === task.id);
  DB.tasks[index] = task;
  return get(task.id);
};

const remove = async id => {
  DB.tasks = DB.tasks.filter(t => t.id !== id);
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
  getByBoardId,
  getByUserId
};
