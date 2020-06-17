const jwt = require('jsonwebtoken')
const { User, Task } = require('../models')

function authentication(req, res, next) {

    let token = req.headers.access_token

    if (!token) {
        next({ name: "AUTH_FAILED1" })
    } else {

        try {
            let decoded = jwt.verify(token, process.env.KEYJWT)

            User.findByPk(decoded.id)
                .then((data) => {

                    if (data) {
                        req.userData = decoded
                        next()
                    } else {
                        next({ name: "AUTH_FAILED" })
                    }

                })


        } catch (err) {

            next(err)
        }
    }



}

function authorization(req, res, next) {

    let idTask = req.params.id

    Task.findByPk(idTask)
        .then((data) => {

            if (!data) {
                throw ({ name: "NOT_AVAILABLE" })
            } else if (data.UserId !== req.userData.id) {
                throw ({ name: "UNAUTHORIZED" })
            } else {
                next()
            }
        })
        .catch((err) => {
            next(err)
        })

}

module.exports = { authentication, authorization }