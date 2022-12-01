// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         is: /\d{10}/
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     spam: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0
//     }
//   }, {
//     sequelize,
//     modelName: 'User',
//     tableName: "user",
//     schema: 'public'
//   });
//   return User;
// };

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /\d{10}/
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      spam: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createdAt : {
        type : DataTypes.DATE,
        allowNull:true
      },
      createdBy : {
        type : DataTypes.STRING
      },
      updatedAt : {
        type : DataTypes.DATE,
        allowNull:true
      },
      updatedBy : {
        type : DataTypes.STRING
      },
      deletedAt : {
        type : DataTypes.DATE,
        allowNull:true
      },
      deletedBy : {
        type : DataTypes.STRING
      }
    }, {
    tableName: "Users",
    schema: 'public'
  });

  return User;
}