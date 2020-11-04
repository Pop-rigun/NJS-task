const router = require('express').Router();
const authJwt = require('./auth.service');

router.route('/login').post(async (req, res) => {
  const { login, password } = req.body;
  try {
    const token = await authJwt(login, password);
    res.json({ token });
  } catch (e) {
    res.status(401).json(e.message);
  }
});

module.exports = router;
