const { DataTypes, Model } = require("sequelize");

class Item extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Item',
      tableName: 'items',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Item.belongsTo(db.Workspace);
    db.Item.hasOne(db.Revenue, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }
}

module.exports = Item;
