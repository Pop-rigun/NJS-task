const url = require('url');

const formatReqUrl = req =>
  url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });

module.exports = {
  accessLogMiddleware: (req, res, next) => {
    const accessLogEntry = {
      method: req.method,
      url: formatReqUrl(req),
      query: req.query,
      body: req.body
    };
    console.info(accessLogEntry);
    next();
  }
};
