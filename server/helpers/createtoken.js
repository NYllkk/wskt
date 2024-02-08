const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (payload, expiresIn) => {
    const secretKey = process.env.JWT_SECRET_KEY
    console.log(secretKey, "in secretr key")
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" })
    // return RES(res, STATUS.OK, "created TOKEn ", token)
    return token
};
const convertArrayValuesToSingle = (obj) => {
    for (const prop in obj) {
        if (Array.isArray(obj[prop])) {
            obj[prop] = obj[prop][0];
        }
    }
    return obj;
};
let processFormFields = (arr) => {
    let processedFields = {};
    for (const [key, value] of Object.entries(arr)) {
        processedFields[key] = Array.isArray(value) ? value[0] : value;
    }
    return processedFields;
};
module.exports = { createToken, convertArrayValuesToSingle, processFormFields }
