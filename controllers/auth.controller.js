require("dotenv").config();
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/user.model");

exports.login = async (req, res) => {

    await User.findOne({ where: { email: req.body.email } })
        .then(async (user) => {

            if (!user) {
                return res.status(400).send({ error: 'Seems like you dont have account' })
            }

            //PasswordComaprison
            const validPassword = await bycrpt.compare(req.body.password, user.password)
            if (!validPassword) {
                return res.status(400).send({ error: 'Incorrect Password' })
            }

            //creating a token and save for the particluar user
            //const token = jwt.sign({ id: data.id, user: data.first_name }, process.env.TOKEN_SECRET)

            const token = jwt.sign({ id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role },
                process.env.TOKEN_SECRET,
                { expiresIn: "30d" }
            );
            //console.log(data, 'userCheck')
            res.header('auth-Token', token)
                .send({ code: 200, data: { token: token }, message: 'Login Sucessfull' })

        })
}




