module.exports = {
  errorHandlerMiddleware: (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message });
    next(err);
  }
};
