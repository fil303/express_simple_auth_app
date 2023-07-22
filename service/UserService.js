var Prisma = require('@prisma/client')
var bcrypt = require('bcrypt')


const prisma = new Prisma.PrismaClient()

async function getHashKey (password){
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

module.exports.storeUser = async data => {
    const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          phone: Number(data.phone),
          password : await getHashKey(data.password),
          photo : ""
        },
    })
    console.log(user)
    return user
}

module.exports.userLogin = async data => {
    var user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
    })
    console.log(user, "first find email")
    if(user?.id || false){
      var passwordCheckResult = await bcrypt.compare(data.password, user.password)
      if(passwordCheckResult) return user

      console.log("password not matched")
      return false
    }
    console.log("user not found")
    return false
}