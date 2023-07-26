const express = require("express")
var Auth = require('../controllers/authController')
var {userRegisterImageUpload} = require("../lib/imageUpload")

var Route = express.Router()

Route.route('/register')
    .get(Auth.getRegisterPage)
    .post(userRegisterImageUpload.single("photo"),Auth.proccessRegistation)
Route.route('/login')
    .get(Auth.getLoginPage)
    .post(Auth.proccessLogin)
Route.get("/logout", Auth.logout)

module.exports = Route;