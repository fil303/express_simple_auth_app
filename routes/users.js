var express = require('express');
const { response } = require('../app');
var Route = express.Router();

/* GET users listing. */

Route.use((request, response, next) => {
  let session = request.session
  if(session?.user?.id || false) next();
  
  response.redirect("/login")
})

Route.get('/dashboard', function(req, res, next) {
  res.render('./user/dashboard');
});

module.exports = Route;
