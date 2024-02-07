require("dotenv").config()
const User = require("../db/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const forgotpass = require("../mailTemplate/forget.js");
const sendmail = require("../common/sendMail.js");
const Register = async (req, res) => {
    const { name, lastName, email, password } = req.body;
    try {
        const findEmail = await User.findOne({
            where: { email: email },
            attributes: {
                exclude: ["password"]
            }
        });
        if (!findEmail) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await User.create({
                name, lastName, email, password: hashedPassword,
            });
            return res.status(200).json({ message: "User Created Successfully", user: createdUser });
        } else {
            return res.status(400).json({ error: "Email already exists" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
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

// 





// const ResetPassword = async (req, res) => {
//     const { password } = req.body;
//     const token = req.params.token;
//     try {
//         jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ error: 'Invalid or expired token' });
//             }

//             const userId = decoded.id;

//             // Update the user's password in the database
//             const user = await User.findByPk(userId);
//             if (!user) {
//                 return res.status(404).json({ error: 'User not found' });
//             }

//             // Update the user's password
//             user.password = hashPassword(password); // Ensure you hash the password
//             await user.save();

//             res.json({ message: 'Password reset successfully' });
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

// 
// const forgetPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const find = await Admin.findOne({
//       where: { email: email },
//       attributes: { exclude: ["password"] },
//     });
//     if (!find) {
//       return RES(res, STATUS.NOT_FOUND);
//     }
//     const tokenc = { id: find.id, email: find.email };
//     const token = await createToken(tokenc);
//     res.json({ token });
//     const url = `https://cloudinary.com/documentation/node_integration${token}`;
//     const emailContent = { name: find.email, url };
//     const { title, description } = forgotpass(emailContent);
//     const info = await sendMail(find.email, title, description);
//     console.log(info);
//   } catch (error) {
//     console.error(error);
//     return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//   }
// };


// final
// const forgot = async (req, res) => {
//     const { email } = req.body
//     try {
//         if (!email) {
//             return (RES(res, STATUS.INTERNAL_SERVER_ERROR))
//         }
//         const find = await testUser.findOne({
//             where: { email }
//         })
//         if (!find) {
//             return RES(res, STATUS.NOT_FOUND)
//         }
//         console.log(find, "in find ")
//         const tokenc = {
//             id: find.id,
//             email: find.email
//         }
//         const token = createToken(tokenc)
//         await res.json({ token })
//         const url = `https://cloudinary.com/documentation/node_integration${token}`
//         const emailContent = {
//             name: find.email,
//             url: url
//         }
//         const { title, description } = forgotpass(emailContent)
//         console.log("title", title)
//         console.log("description", description)
//         const info = await sendMail(find.email, title, description)
//         console.log(info, "email info")
//         await PasswordResetToken.create({
//             userId: find.id,
//             token: token,
//             expiresAt: new Date(Date.now() + 20 * 60 * 1000)
//         })
//     } catch (error) {
//         console.log(error)
//         return
//     }
// }