const routes = require('express').Router()
const taskController = require('../controllers/task-controller')
const { authentication, authorization } = require('../middlewares/auth')


routes.use(authentication)

routes.get('/', taskController.fetchTask)

routes.post('/', taskController.createTask)

routes.put('/:id', authorization, taskController.editTask)

routes.delete('/:id', authorization, taskController.removeTask)


module.exports = routes