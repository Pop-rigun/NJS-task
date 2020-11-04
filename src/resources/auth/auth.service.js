const bcrypt = require('bcrypt');
const userService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../../common/errors');
const { JWT_SECRET_KEY } = require('../../common/config');

const jwtAuth = async (login, password) => {
  const user = await userService.findByLogin(login);
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('invalid password');
    }
    const token = jwt.sign(
      { userId: user.userId, login: user.login },
      JWT_SECRET_KEY
    );
    return token;
  }
  throw new NotFoundError('user not found');
};

module.exports = jwtAuth;
