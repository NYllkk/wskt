const express = require("express")
const app = express.Router()
const UserRoutes = require("../src/UserRoute.js")
app.use("/user", UserRoutes)

module.exports = app