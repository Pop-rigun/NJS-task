const { getDB } = require('../../common/db');

const users = () => getDB().collection('users');

const getAll = async () => {
  return users()
    .find({})
    .toArray();
};

const create = async user => {
  return users().insertOne(user);
};

const get = async id => {
  return users().findOne({ id });
};

const update = async (id, options) => {
  return users().findOneAndUpdate({ id }, { $set: options });
};

const remove = async id => {
  return users().deleteOne({ id });
};

const findByLogin = async login => {
  return users().findOne({ login });
};

module.exports = {
  getAll,
  create,
  getByID: get,
  update,
  remove,
  findByLogin
};
