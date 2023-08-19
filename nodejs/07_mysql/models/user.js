const { DataTypes, Model } = require('sequelize');

/**
 * 사용자id
 * 닉네임 nickname
 * 이메일 email
 * PW password
 */

class User extends Model {
  static init(sequelize) {
    return super.init({ // Column 정의
      // id: { // => sequelize가 자동 생성하므로 생략 가능
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // created_at: {
      //   type: DataTypes.DATE, // mysql의 DATATIME
      //   defaultValue: DataTypes.NOW, // mysql의 DEFAULT, now()
      // },
    }, { // Model 설정
      sequelize,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  }

  static associate(db) {
    // User(1):Comment(N) 관계에서 User.hasMany(Comment)
    // sourceKey 내 id
    db.User.hasMany(db.Workspace, { as: "owner", foreignKey: "owner_id" }); 
    db.User.belongsToMany(db.Workspace, { through: db.WorkspaceMember, as: "Workspaces" })
  }
}

module.exports = User;
