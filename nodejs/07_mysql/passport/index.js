const passport = require('passport');
const local = require('./local');
const User = require('../models/user');
const Workspace = require('../models/workspace');

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'nickname', 'email'],
        include: [
          {
            model: Workspace,
            as: "Workspaces",
          },
        ],
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(error);
    }
  });

  local();
};

module.exports = passportConfig;
