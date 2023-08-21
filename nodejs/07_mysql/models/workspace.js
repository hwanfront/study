const { DataTypes, Model } = require("sequelize");

/**
 * 워크스페이스 id
 * 오너 owner
 * 이름 name
 * 주소 url
 */

class Workspace extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING(30),
        allowNull: false, 
        unique: true, 
      },
    }, {
      sequelize,
      modelName: 'Workspace',
      tableName: 'workspaces',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Workspace.belongsTo(db.User, { as: "owner", foreignKey: "OwnerId" });
    db.Workspace.belongsToMany(db.User, { through: db.WorkspaceMember, as: "Members" });
    db.Workspace.hasMany(db.Revenue);
    db.Workspace.hasMany(db.Item);
  }
}

module.exports = Workspace;
