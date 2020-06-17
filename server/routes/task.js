const routes = require('express').Router()
const taskController = require('../controllers/task-controller')
const { authentication, authorization } = require('../middlewares/auth')

routes.use(authentication)
routes.post('/', taskController.createTask)

routes.get('/', taskController.fetchTask)

routes.put('/:id', authorization, taskController.editTask)

routes.delete('/:id', authorization, taskController.removeTask)


module.exports = routes