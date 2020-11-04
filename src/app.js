const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const authRouter = require('./resources/auth/auth.router');
const { accessLogMiddleware } = require('./middleware/access.log.middleware');
const {
  errorHandlerMiddleware
} = require('./middleware/error.handler.middleware');
const { authMiddleware } = require('./middleware/auth.middleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

// logging
app.use(accessLogMiddleware);

// routes
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/', authRouter);

app.use(authMiddleware);
app.use('/users', userRouter);
app.use('/boards', boardRouter);

// errors handling
app.use(errorHandlerMiddleware);

process.on('uncaughtException', err => {
  console.error(`Caught exception: ${err}`);
  throw err;
});

process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
