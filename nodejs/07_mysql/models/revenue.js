const { DataTypes, Model } = require("sequelize");

class Revenue extends Model {
  static init(sequelize) {
    return super.init({
      month: {
        type: DataTypes.ENUM(1,2,3,4,5,6,7,8,9,10,11,12),
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING(30),
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Revenue',
      tableName: 'revenues',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Revenue.belongsTo(db.Workspace);
    db.Revenue.hasOne(db.RevenueDetail, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    db.Revenue.belongsTo(db.Item);
  }
}

module.exports = Revenue;
