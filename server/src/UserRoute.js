const express = require("express")
const Register = require("./UserController.js")
const route = express.Router()
route.post("/register", Register)


module.exports = route
// api/user/register