const { PORT } = require('./common/config');
const app = require('./app');
const { init } = require('./common/db');
const User = require('./resources/users/user.model');
const bcrypt = require('bcrypt');

function craeteAdminUserIfNotExists(db, cb) {
  bcrypt.hash('admin', 8).then(hashed => {
    const admin = new User({
      name: 'admin',
      login: 'admin',
      password: hashed
    });
    db.collection('users')
      .updateOne({ login: 'admin' }, { $setOnInsert: admin }, { upsert: true })
      .then(cb);
  });
}
init().then(db =>
  craeteAdminUserIfNotExists(db, () => {
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
  })
);
