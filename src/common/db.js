const User = require('../resources/users/user.model');
const taskService = require('../resources/tasks/task.service');

const db = [];

db.push(new User(),new User(),new User());

const getAllUsers = async () => db.slice(0);


const getUser = async (id) => db.filter (el=> el.id === id)[0];

const createUser = async user => {
    db.push(user);
    return user;
};

const updateUser = async user => {
    const id = user.id;
    const oldUser = db.filter(item => item.id === id);
    const idx = db.indexOf(oldUser[0]);
    db[idx] = user;
    return user;
  };
  
  const delUser = async id => {
    const userToDelete = db.filter(item => item.id === id);
    const idx = db.indexOf(userToDelete[0]);
    db.splice(idx, 1);
    await taskService.nullTaskByUser(id);
    return db.slice(0);
  };
  
  module.exports = { getAllUsers, getUser, createUser, updateUser, delUser };
  

