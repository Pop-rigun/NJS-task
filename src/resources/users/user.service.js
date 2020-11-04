const usersRepo = require('./user.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => usersRepo.getAll();

const create = async user => usersRepo.create(user);

const getById = async id => usersRepo.getByID(id);

const update = async (id, options) => {
  return usersRepo.update(id, options);
};

const remove = async id => {
  const tasks = await taskService.getByUserId(id);
  const unassigningTasks = tasks.map(t => taskService.unassign(t.id));
  await Promise.all(unassigningTasks);
  return usersRepo.remove(id);
};

const findByLogin = async login => {
  return usersRepo.findByLogin(login);
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
  findByLogin
};
