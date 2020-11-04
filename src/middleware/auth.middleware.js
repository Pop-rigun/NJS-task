const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = {
  authMiddleware: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No auth header provided' });
    }
    const authHeaderParts = authHeader.split(' ');
    if (authHeaderParts[0] === 'Bearer') {
      const token = authHeaderParts[1];
      if (!token) {
        return res.status(401).json({ message: 'No token provided!' });
      }
      try {
        jwt.verify(token, JWT_SECRET_KEY);
      } catch (e) {
        return res.status(401).json({ message: 'Token verification failed' });
      }
    }
    next();
  }
};
