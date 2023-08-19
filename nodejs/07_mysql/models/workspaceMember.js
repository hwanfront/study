const { DataTypes, Model } = require("sequelize");

class WorkspaceMember extends Model {
  static init(sequelize) {
    return super.init({
      editPermission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isLoggedIn: {
        type: DataTypes.DATE,
      }
    }, {
      sequelize,
      modelName: 'WorkspaceMember',
      tableName: 'workspace_members',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {}
}

module.exports = WorkspaceMember;
