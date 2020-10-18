const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./errors/errorHandler');
const morgan = require('morgan');
const logger = require('./common/logger');
const exit = process.exit;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(errorHandler);
app.use(morgan('dev'));

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

process.on('uncaughtException', (error, origin) => {
  console.log({
    timestamp: new Date().toISOString(),
    level: 'error',
    error: `${error}`,
    origin,
    stack: error.stack
  });
  exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log({
    timestamp: new Date().toISOString(),
    level: 'error',
    origin: 'unhandledRejection',
    reason: `${reason.message}`,
    promise: `${promise}`,
    stack: reason.stack
  });
  exit(1);
});



module.exports = app;
