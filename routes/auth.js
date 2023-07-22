const express = require("express")
var {
    getRegisterPage,
    proccessRegistation,
    getLoginPage,
    proccessLogin,
    logout,
} = require('../controllers/authController')

var Route = express.Router()

Route.route('/register')
    .get(getRegisterPage)
    .post(proccessRegistation)
Route.route('/login')
    .get(getLoginPage)
    .post(proccessLogin)
Route.get("/logout", logout)

module.exports = Route;