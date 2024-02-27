const Router = require('express')
const router = new Router()
const controller = require('./authContr')
const { check } = require('express-validator')
const middleware = require('./middleware/Middleware')
const wareRole = require('./middleware/WareRoles')

router.post('/registration', [
    check('username', "Username can not be empty").notEmpty(),
    check('password', "Password must habe more than 6 symbols ").isLength({min: 4})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', middleware, controller.getUsers)

module.exports = router;