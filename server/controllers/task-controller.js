const { Task } = require('../models')

class TaskController {

    static createTask(req, res, next) {

        let newTask = { title: req.body.title, category: req.body.category, description: req.body.description, UserId: req.userData.id }

        Task.create(newTask)
            .then((data) => {

                res.status(201).json({ data })

            }).catch((err) => {
                next(err)
            })

    }

    static fetchTask(req, res, next) {

        Task.findAll()
            .then((data) => {

                res.status(200).json({ data })

            })
            .catch((err) => {
                next(err)
            })

    }

    static editTask(req, res, next) {

        let updateTask = { title: req.body.title, category: req.body.category, description: req.body.description }

        let taskId = req.params.id


        Task.update(updateTask, { where: { id: taskId } })
            .then((data) => {

                res.status(200).json({ data })

            })
            .catch((err) => {

                next(err)
            })

    }

    static removeTask(req, res, next) {

        let taskId = req.params.id


        Task.destroy({ where: { id: taskId } })
            .then((data) => {

                res.status(200).json({ message: "Success to delete task!" })

            })
            .catch((err) => {
                next(err)
            })

    }





}

module.exports = TaskController