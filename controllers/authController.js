var {
    storeUser,
    userLogin,
} = require('../service/UserService')
var multer = require('multer');


module.exports.getRegisterPage = (request, response) => {
    response.render("register")
}

module.exports.proccessRegistation = (request, response) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/public/users')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
      
    const upload = multer({ storage: storage })
    console.log(upload.single("photo"))
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