const router = require('express').Router();

//Controllers
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const todoController = require('../controllers/todo.controller')

//Middleware
const isAuth = require('../middleware/isAuth')

//Auth routes
router.post('/login', authController.login)

//User routes
router.post('/register', userController.create)
router.get('/logged/user', isAuth, userController.getLoggedUser)
router.get('/users', isAuth, userController.getAllUsers)

//Todo routes
router.post('/todo', isAuth, todoController.create)
router.put('/todo/:id', isAuth, todoController.update)
router.delete('/todo/:id', isAuth, todoController.delete)
router.get('/todo/user/:id', isAuth, todoController.getAllTodosByUser)



module.exports = router