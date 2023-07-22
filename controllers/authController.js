var {
    storeUser,
    userLogin,
} = require('../service/UserService')


module.exports.getRegisterPage = (request, response) => {
    response.render("register")
}

module.exports.proccessRegistation = (request, response) => {
    if(request.body.password != request.body.confirm_password)
       return response.send("password not match") 
    if(storeUser(request.body))
       return response.send("stored")
    return response.send("failed")
}

module.exports.getLoginPage = (request, response) => {
    response.render("login")
}

module.exports.proccessLogin = async (request, response) => {
    var login = await userLogin(request.body)
    if(login) return response.render("user/dashboard")
    return response.send("loged in failed")
}