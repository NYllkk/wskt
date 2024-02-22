const express = require("express")
const app = express.Router()
const UserRoutes = require("../src/UserRoute.js")
const GroupRoutes = require("../src/group/GroupRoute.js")
const BroadCast = require("../src/broadcast/broadCastRoute.js")
app.use("/user", UserRoutes)
app.use("/group", GroupRoutes)
app.use("/broad", BroadCast)

module.exports = app