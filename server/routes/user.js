const routes = require('express').Router()
const userController = require('../controllers/user-controller')

routes.post('/login', userController.loginUser)

routes.post('/register', userController.registerUser)

routes.post('/googleSign', userController.googleSign)


module.exports = routes