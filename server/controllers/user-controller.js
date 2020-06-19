const { User } = require('../models')
const Helper = require('../helpers/helpers')
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

class UserController {

    static registerUser(req, res, next) {

        let newUser = { email: req.body.email, password: Helper.hashPassword(req.body.password) }


        User.findOne({ where: { email: newUser.email } })
            .then((data) => {

                if (!data) {

                    return User.create(newUser)
                }

            })
            .then((data) => {

                // console.log(data)
                if (data) {
                    res.status(201).json({ id: data.id, email: data.email })
                } else {
                    throw ({ name: "EMAIL_ALREADY_REGISTERED" })
                }

            })
            .catch((err) => {
                next(err)
            })

    }

    static loginUser(req, res, next) {

        let userLogin = { email: req.body.email, password: req.body.password }

        User.findOne({ where: { email: userLogin.email } })
            .then((data) => {

                if (data) {

                    if (Helper.checkPassword(userLogin.password, data.password)) {

                        let dataUser = { id: data.id, email: data.email }

                        let access_token = jwt.sign(dataUser, process.env.KEYJWT);

                        res.status(200).json({ access_token: access_token, emailUser: dataUser.email, idUser: dataUser.id })
                    } else {

                        throw ({ name: "EMAIL_PASS_NOT MATCH" })
                    }

                } else {
                    throw ({ name: "NO_EMAIL_FOUND" })
                }

            })
            .catch((err) => {

                next(err)
            })


    }

    static googleSign(req, res, next) {

        let token = req.body.id_token

        let client_id = process.env.KEYGOOGLE

        const client = new OAuth2Client(client_id)

        let email

        client.verifyIdToken({
            idToken: token,
            audience: client_id
        })
            .then((ticket) => {

                email = ticket.getPayload().email
                return User.findOne({ where: { email: email } })
            })
            .then((data) => {

                if (data) {
                    let payload = { id: data.id, email: data.email }
                    return payload
                } else {
                    let newUser = { email: email, password: "googlepass" }
                    return User.create(newUser)
                }


            })
            .then((data) => {

                let access_token = jwt.sign({ id: data.id, email: data.email }, process.env.KEYJWT)

                res.status(200).json({ access_token: access_token, emailUser: data.email, idUser: data.id })
            })
            .catch((err) => {

                next(err)
            })
    }



}

module.exports = UserController