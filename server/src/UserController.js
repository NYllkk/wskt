require("dotenv").config()
const User = require("../db/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotpass = require("../mailTemplate/forget.js");
const sendmail = require("../common/sendMail.js");
const formidable = require("formidable");
const { processFormFields } = require("../helpers/createtoken.js");
const { testUserUpload } = require("../common/uploadFile.js");
const Welcome = require("../mailTemplate/Welcome.js");


const Register = async (req, res) => {
    console.log(" here in register ")
    const form = new formidable.IncomingForm();
    try {
        console.log(" here in register1 ")
        const returndata = await new Promise((resolve, reject) => {
            console.log("register 1.2")
            form.parse(req, async (error, fields, files) => {
                console.log(fields, "here consoling fields")
                console.log("register 1.3")
                if (error) {
                    return reject(new Error("Error occurred during parsing the data."));
                }
                console.log(" here in register2 ")
                try {
                    const processedData = processFormFields(fields);
                    const { name, lastName, email, password, PhoneNumber } = processedData;
                    const hashedPassword = await bcrypt.hash(password, 10);
                    console.log(" here in register3 ")
                    let profilePictureUrl = "";
                    console.log(" here in profile picture ")
                    if (
                        files.profilePicture &&
                        Array.isArray(files.profilePicture) &&
                        files.profilePicture.length > 0
                    ) {
                        const uploadedFile = files.profilePicture[0];
                        const imagePath = uploadedFile.filepath;
                        const public_id = await testUserUpload(imagePath);
                        profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
                    }
                    const existingUser = await User.findOne({
                        where: {
                            email, PhoneNumber
                        },
                        attributes: { exclude: ["password"] },
                    });
                    if (existingUser) {
                        throw new Error("User with this email or Number already exists.");
                    }
                    console.log(" here in register before user created  ")
                    const newUser = await User.create({
                        name,
                        lastName,
                        email,
                        PhoneNumber,
                        password: hashedPassword,
                        profilePicture: profilePictureUrl,
                    });
                    const emailContent = { name: newUser.name }
                    console.log("in email content")
                    const { title, description } = Welcome(emailContent)
                    const info = await sendmail(newUser.email, title, description)
                    console.log(info, "getting info here ")
                    resolve({ message: "User created successfully", newUser });
                    return
                } catch (error) {
                    reject(error);
                }
            });
        });
        res.status(200).json(returndata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const findEmail = await User.findOne({
            where: { email: email },
        });
        if (!findEmail) {
            return res.status(400).json({ error: "Email doesn't exist" });
        }
        if (!findEmail.password) {
            return res.status(500).json({ error: "User data is missing password" });
        }
        const isMatch = await bcrypt.compare(password, findEmail.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Password doesn't match" });
        }
        const expiresIn = "1day";
        const data = {
            email: findEmail.email,
            name: findEmail.name,
            id: findEmail.id
        };
        const createToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn });
        return res.status(200).json({ message: "Token created successfully", createToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const forgotpasword = async (req, res) => {
    const { email } = req.body
    try {
        const find = await User.findOne({
            where: { email: email }, attributes: {
                exclude: ["password"]
            }
        })
        if (!find) {
            return res.status(404).json({ error: "Email not found " })
        }
        const data = {
            id: find.id,
            email: find.email
        }
        const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1hr" })
        console.log("token", token)
        res.json({ token })
        const url = "http://localhost:5173/log"
        const emailContent = { name: find.name, url }
        const { title, description } = forgotpass(emailContent)
        console.log("with email ", find.email)
        const info = await sendmail(find.email, title, description)
        console.log(info, "getting info here ")
        return
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

const ResetPassword = async (req, res) => {
    const { password } = req.body;
    const key = process.env.SECRET_KEY;
    console.log(key, "SECRET KEY ");
    let token = await req.headers.authorization;
    let tokenArr = token?.split(" ");
    token = tokenArr.length > 1 ? tokenArr[1] : "";
    try {
        if (!token) {
            return res.status(404).json({ error: "Token is invalid or not found" });
        }
        console.log(token, "in here controller ");
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(400).json({ error: "Token NOT FOUND OR INVALID" });
        }
        console.log(decoded, "in here after decoded ");
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(400).json({ error: "User not valid" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        return res.json({ message: "Password reset successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = { Register, login, forgotpasword, ResetPassword }



// http://localhost:2000/api/user/reset

// const { name, lastName, email, password } = req.body;
// try {
//     const findEmail = await User.findOne({
//         where: { email: email },
//         attributes: {
//             exclude: ["password"]
//         }
//     });
//     if (!findEmail) {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const createdUser = await User.create({
//             name, lastName, email, password: hashedPassword,
//         });
//         return res.status(200).json({ message: "User Created Successfully", user: createdUser });
//     } else {
//         return res.status(400).json({ error: "Email already exists" });
//     }
// } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
// }