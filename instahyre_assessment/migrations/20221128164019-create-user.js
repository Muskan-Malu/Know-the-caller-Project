'use strict';

const { trim } = require('lodash');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /\d{10}/
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      spam: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt : {
        type : Sequelize.DATE,
        allowNull:true
      },
      createdBy : {
        type : Sequelize.STRING
      },
      updatedAt : {
        type : Sequelize.DATE,
        allowNull:true
      },
      updatedBy : {
        type : Sequelize.STRING
      },
      deletedAt : {
        type : Sequelize.DATE,
        allowNull:true
      },
      deletedBy : {
        type : Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};