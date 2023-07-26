var multer = require("multer")

function storage (path){
    return storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const extention = (file.mimetype).split('/')[1]
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extention)
        }
    })
}

module.exports.userRegisterImageUpload =  multer({ storage: storage('public/users') })