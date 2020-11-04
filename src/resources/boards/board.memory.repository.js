const DB = require('../../common/inmemory_db');

const getAll = async () => {
  return DB.boards;
};

const create = async board => {
  DB.boards.push(board);
};

const get = async id => {
  return DB.boards.find(b => b.id === id);
};

const update = async board => {
  const index = DB.boards.findIndex(b => b.id === board.id);
  DB.boards[index] = board;
  return get(board.id);
};

const remove = async id => {
  DB.boards = DB.boards.filter(b => b.id !== id);
};

module.exports = { getAll, create, get, update, remove };
