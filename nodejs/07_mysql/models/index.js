const Sequelize = require('sequelize');

const user = require('./user');
const revenue = require('./revenue');
const revenueDetail = require('./revenueDetail');
const item = require('./item');
const workspace = require('./workspace');
const workspaceMember = require('./workspaceMember');

const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);


db.User = user;
db.Revenue = revenue;
db.RevenueDetail = revenueDetail;
db.Item = item;
db.Workspace = workspace;
db.WorkspaceMember = workspaceMember;

Object.keys(db).forEach((model) => {
  db[model].init(sequelize);
})

Object.keys(db).forEach((model) => {
  if(db[model].associate) {
    db[model].associate(db);
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
