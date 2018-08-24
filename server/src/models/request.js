export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requestId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rideId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    passenger:{
      type: DataTypes.STRING,
      allowNull: false
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departure: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date:{
      type: DataTypes.STRING,
      allowNull: false
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Request.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Request.belongsTo(models.Ride, {
      foreignKey: 'rideId',
      onDelete: 'CASCADE'
    });
  };
  return Request;
};