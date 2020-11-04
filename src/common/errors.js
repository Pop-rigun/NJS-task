class NotFoundError extends Error {
  constructor() {
    super('not found');
  }
}

module.exports = { NotFoundError };
