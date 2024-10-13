const bycrpt = require('bcryptjs')

const User = require('../models/user.model')

//Create/register a user
exports.create = async (req, res) => {

    //Hash the password before store in the database
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(req.body.password, salt)

    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
    };

    try {
        User.create(user)
            .then(data => {
                res.send({
                    code: 200,
                    message: "User created successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error occurred while registering the User."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Get logged in user by user token
exports.getLoggedUser = async (req, res) => {
    const token = req.header('authorization')

    User.scope('withoutPassword').findOne({ where: { token: token } })
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "logged user"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving logged user."
            });
        });

}

//Get all users registerd in the system
exports.getAllUsers = async (req, res) => {

    User.scope('withoutPassword').findAll()
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "users"
            });
        })
        .catch(err => {
            console.log(err, 'err');
            res.status(500).send({
                message:
                    err.message || "Error occurred while retrieving users."
            });
        });

}







