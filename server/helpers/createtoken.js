const jwt = require("jsonwebtoken");

require("dotenv").config();

const createToken = (payload, expiresIn) => {
    const secretKey = process.env.JWT_SECRET_KEY
    console.log(secretKey, "in secretr key")
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" })
    // return RES(res, STATUS.OK, "created TOKEn ", token)
    return token
};
module.exports = createToken