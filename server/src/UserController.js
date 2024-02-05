const User = require("../db/User.js");
const bcrypt = require("bcrypt");

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

module.exports = Register;



