const { getDB } = require('../../common/db');

const boards = () => getDB().collection('boards');

const getAll = async () => {
  return boards()
    .find({})
    .toArray();
};

const create = async board => {
  return boards().insertOne(board);
};

const get = async id => {
  return boards().findOne({ id });
};

const update = async (id, options) => {
  return boards().findOneAndUpdate({ id }, { $set: options });
};

const remove = async id => {
  return boards().deleteOne({ id });
};

module.exports = { getAll, create, get, update, remove };
