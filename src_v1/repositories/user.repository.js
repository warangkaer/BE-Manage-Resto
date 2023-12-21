const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const userModel = require("../models/user")(sequelize, DataTypes);
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')

module.exports = {
  getUserByUsername: async ({ username }) => {
    try {
      const user = await userModel.findOne({
        attributes: ['username', 'password', 'email', 'phoneNumber'],
        where: {
          username: {
            [Op.eq]: username,
          },
        },
      });

      return user;
    } catch (err) {
      return err;
    }
  },
  
  createUser: async (req) => {
    try{
      const hashedPassword = await bcrypt.hash(req.password, 10)

      const user = userModel.create({
        fullname : req.fullname,
        username : req.username,
        email : req.email,
        phoneNumber : req.phoneNumber,
        password : hashedPassword
      })

      return user
    } catch (err) {
      return err
    }
  }
};
