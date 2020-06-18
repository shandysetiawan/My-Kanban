const routes = require('express').Router()
const userRoutes = require('./user')
const taskRoutes = require('./task')

routes.use('/', userRoutes)

routes.use('/task', taskRoutes)

module.exports = routes