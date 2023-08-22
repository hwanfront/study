const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const { checkAuthenticated } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.get('/isloggedin', checkAuthenticated, (req, res, next) => {
  return res.send('ok');
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      console.error(err);
      return next(err);
    }
    if(info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      if(loginErr) {
        console.error(err);
        return next(loginErr);
      }
      return res.status(200).json(await User.findOne({
        where: { id: user.id },
        attributes: ["id", "nickname", "email"],
      }));
    })
  })(req, res, next);
});


router.post('/register', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if(exUser) {
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    })
    res.status(201).send("회원가입 성공!");
  } catch (error) {
    next(error);
  }
});

router.post('/logout', checkAuthenticated, (req, res) => {
  req.logout(() => {
    res.send('ok');
  })
})

module.exports = router;
