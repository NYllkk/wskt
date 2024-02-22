const express = require("express")
const router = express.Router()

const { CreateMessage, getMessage } = require("./BroadCastController.js")
router.post("/create", CreateMessage)
router.get("/get", getMessage)

module.exports = router

// /broad/create