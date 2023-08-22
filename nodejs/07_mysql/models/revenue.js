const { DataTypes, Model } = require("sequelize");

class Revenue extends Model {
  static init(sequelize) {
    return super.init({
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 12,
        }
      },
      company: {
        type: DataTypes.STRING(30),
      },
      amount: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        validate: {
          min: {
            args: 0,
            msg: '매출은 0원보다 커야합니다.'
          },
          max: {
            args: 10_000_000_000_000,
            mag: '매출은 10,000,000,000,000원보다 작아야합니다.'
          }
        }
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
