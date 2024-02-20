const express = require("express")
const app = express.Router()
const UserRoutes = require("../src/UserRoute.js")
const GroupRoutes = require("../src/group/GroupRoute.js")
app.use("/user", UserRoutes)
app.use("/group", GroupRoutes)
module.exports = app