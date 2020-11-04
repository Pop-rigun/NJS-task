const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(c => new Column(c));
    this.Column = Column;
  }
}

class Column {
  constructor({ id = uuid(), title = 'title', order = 1 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Board;
