const express = require("express")
var {
    getRegisterPage,
    proccessRegistation,
    getLoginPage,
    proccessLogin,
} = require('../controllers/authController')

var Route = express.Router()

Route.get('/register', getRegisterPage)
Route.post('/register', proccessRegistation)
Route.get('/login', getLoginPage)
Route.post('/login', proccessLogin)

module.exports = Route;