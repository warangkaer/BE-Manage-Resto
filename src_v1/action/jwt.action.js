const dotenv = require('dotenv').config({path : '../.env'})
const jwt = require('jsonwebtoken')

exports.createToken = user => {
  const token = jwt.sign(
    {
      id: user.userId,
      username: user.username,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      expiresIn : Math.floor(Date.now() / 1000) + (process.env.TOKEN_EXP_TIME)
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: process.env.TOKEN_EXP_TIME,
    }
  );

  return token
}
