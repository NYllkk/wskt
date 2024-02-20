const express = require("express")
const { CreateGroup, getdata } = require("./GroupController.js")

const route = express.Router()
// // route.use(formidable())
route.post("/create", CreateGroup)
route.get("/get", getdata)



module.exports = route
// api/user/register

