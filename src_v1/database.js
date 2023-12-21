const dotenv = require('dotenv').config({path : '../.env'})

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
)

sequelize.authenticate()
  .then(() => {
    console.log('connection has been estabilished succescfully')
  })
  .catch(err => {
    console.error('Unable to connect database : ', err)
  })

module.exports = sequelize;