const routes = require('express').Router()
const userRoutes = require('./user')
const taskRoutes = require('./task')
const errorHandler = require('../middlewares/errorHandler')

routes.use('/', userRoutes)

routes.use('/task', taskRoutes)

routes.use(errorHandler)


module.exports = routes