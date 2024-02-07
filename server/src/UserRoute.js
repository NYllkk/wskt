const express = require("express")
const { Register, login, forgotpasword, ResetPassword } = require("./UserController.js")
const isUser = require("../middleware/userMiddleware.js")
const route = express.Router()
route.post("/register", Register)
route.post("/login", login)
route.post("/forget", forgotpasword)
route.post("/reset", isUser, ResetPassword)
// app.use(isUser)
// http://localhost:2000/api/user/reset


module.exports = route
// api/user/register

