const db = require('../../common/db');

const getAll = async () => db.getAllUsers();
 
const get = async id => {
  const user = await db.getUser(id);
  return user;
};


const create = async user => db.createUser(user);

const update = async user => db.updateUser(user);

const del = async id => db.delUser(id);

module.exports = { getAll, get, create, update, del };
