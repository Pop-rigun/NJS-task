const { getDB } = require('../../common/db');
const tasks = () => getDB().collection('tasks');

const getAll = async () => {
  return tasks()
    .find({})
    .toArray();
};

const create = async task => {
  return tasks().insertOne(task);
};

const get = async id => {
  return tasks().findOne({ id });
};

const getByBoardId = async boardId => {
  return tasks()
    .find({ boardId })
    .toArray();
};

const getByUserId = async userId => {
  return tasks()
    .find({ userId })
    .toArray();
};

const update = async (id, options) => {
  return tasks().findOneAndUpdate({ id }, { $set: options });
};

const remove = async id => {
  return tasks().deleteOne({ id });
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
