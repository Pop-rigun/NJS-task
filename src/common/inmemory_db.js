const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');
const User = require('../resources/users/user.model');
const DB = {
  users: [],
  tasks: [],
  boards: []
};

function init() {
  DB.users.push(new User());
  DB.tasks.push(new Task());
  DB.boards.push(new Board());
}

init();
module.exports = DB;
