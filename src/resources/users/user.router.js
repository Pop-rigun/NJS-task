const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const bcrypt = require('bcrypt');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = new User({ name, login, hashedPassword });
  await usersService.create(user);
  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const updatedUser = await usersService.update(id, req.body);
  res.json(User.toResponse(updatedUser));
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  await usersService.remove(id);
  res.sendStatus(200);
});

module.exports = router;
