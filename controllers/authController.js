var {
    storeUser,
    userLogin,
} = require('../service/UserService')

var multer = require('multer');


module.exports.getRegisterPage = (request, response) => {
    response.render("register")
}

module.exports.proccessRegistation = (request, response) => {
    console.log(request.file)
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
    var loginUser = await userLogin(request.body)
    if(loginUser) {
        request.session.user = loginUser
        return response.redirect("users/dashboard")
    }
    return response.send("loged in failed")
}

module.exports.logout = async (request, response) => {
    let session = request.session
    if(session?.user?.id || false) session.user = null;
    
    return response.redirect("/login")
}