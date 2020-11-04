const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'title',
    order = 1,
    description = 'desc',
    userId = 'test',
    boardId = 'boardid',
    columnId = 'columnid'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
