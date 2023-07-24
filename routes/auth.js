const express = require("express")
var Auth = require('../controllers/authController')

var Route = express.Router()

Route.route('/register')
    .get(Auth.getRegisterPage)
    .post(Auth.proccessRegistation)
Route.route('/login')
    .get(Auth.getLoginPage)
    .post(Auth.proccessLogin)
Route.get("/logout", Auth.logout)

module.exports = Route;