export default (sequelize, DataTypes) => {
  const Ride = sequelize.define('Ride', {
    rideId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
      allowNull: false
    }
  }, {});
  Ride.associate = models => {
    // associations can be defined here
    Ride.belongsTo(models.User, {
      foreignKey: 'rideId',
      onDelete: 'CASCADE'
    });
    Ride.hasMany(models.Request, {
      foreignKey: 'rideId',
      onDelete: 'CASCADE'
    });
  };
  return Ride;
};