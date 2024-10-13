const Todo = require("../models/todo.model");

//Create todo item
exports.create = async (req, res) => {

    const todo = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        status: 'TODO',
        translation: {
            'en': req.body.title,
        }

    };

    try {
        Todo.create(todo)
            .then(data => {
                res.send({
                    code: 200,
                    message: "Todo item created successfully!"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the todo item."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Update todo item
exports.update = async (req, res) => {

    const id = req.params.id;
    const todo = {
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id,
        status: 'TODO',
        translation: {
            'en': req.body.title,
        }
    };

    try {
        Todo.update(todo, {
            where: { id: id }
        }).then(data => {
            res.send({
                code: 200,
                message: "Todo item updated successfully!"
            });
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while update the todo item."
            });
        });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

//Delete todo item
exports.delete = async (req, res) => {

    const id = req.params.id;

    try {
        Todo.destroy({ where: { id: id } })
            .then(data => {
                res.send({ message: "Todo item was deleted successfully!" });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while deleting the todo item."
                });
            });
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


//Get todo list for user
exports.getAllTodosByUser = async (req, res) => {

    const id = req.params.id;

    Todo.findAll({ where: { user_id: id } })
        .then(data => {
            res.send({
                code: 200,
                data: data,
                message: "todo items"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todo list."
            });
        });

}