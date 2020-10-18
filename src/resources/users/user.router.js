const router = require('express').Router();
const { catchError, customError } = require('../../common/error');
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(catchError(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
}));

router.route('/:id').get(catchError(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
  res.json(User.toResponse(user));
  } else{
    throw new customError (404, 'User not found')
   }
}));

router.route('/').post(catchError( async (req, res)=>{
 const user =  await usersService.create(
   new User({ 
    login: req.body.login, 
    password: req.body.password, 
    name: req.body.name
  })
  );
  if (user) {
    res.json(User.toResponse(user));
  } else {
    throw new customError(400, 'Bad request');
  }
}));

router.route('/:id').put(catchError(async (req, res) => {
  const user = new User({
    name: req.body.name,
    login: req.body.login,
    password: req.body.password
  });
  if (user) {
    user.id = req.params.id;
    const updatedUser = await usersService.update(user);
    res.json(User.toResponse(updatedUser));
  } else {
    throw new customError(400, 'Bad request');
  }
}));

router.route('/:id').delete(catchError(async (req, res) => {
  const user = await usersService.del(req.params.id);
  if (user){
  res.json(user.map(User.toResponse));
  }
  else{
    throw new customError(404, 'User not found');
  }
}));

module.exports = router;
