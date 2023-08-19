const { DataTypes, Model } = require("sequelize");

class RevenueDetail extends Model {
  static init(sequelize) {
    return super.init({
      day: {
        type: DataTypes.INTEGER,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'RevenueDetail',
      tableName: 'revenue_details',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.RevenueDetail.belongsTo(db.Revenue);
  }
}

module.exports = RevenueDetail;
