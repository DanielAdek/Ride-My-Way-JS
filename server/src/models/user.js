export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'username can only contain letters'
        },
        len: {
          args: [4, 30],
          msg: 'username can only be four to thirty letters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email is already in use by another user'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email can only be an email format like this youremail@email.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Ride, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Request, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};