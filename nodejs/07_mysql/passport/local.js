const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const local = () => passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    if(!user) {
      return done(null, false, { message: '존재하지 않는 이메일입니다.' });
    }
    console.log(user.dataValues);
    console.log(user.dataValues.password);
    console.log(user.password);
    const result = await bcrypt.compare(password, user.dataValues.password);
    if(!result) {
      return done(null, false, { message: '비밀번호가 틀렸습니다.' });
    }
    return done(null, user);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}))

module.exports = local;