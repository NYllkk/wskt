const nodemailer = require("nodemailer");

const sendMail = async (receiver, title, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "navneet1903348@gmail.com",
                pass: "iworqwagqsrqradx",
            },
        });
        const mailOptions = {
            from: "navneet1903348@gmail.com",
            to: receiver,
            subject: title,
            html: message,
        };
        console.log(receiver, title, message)
        const info = await transporter.sendMail(mailOptions);
        console.log(mailOptions, "this is in mail option ");
        console.log(info, "this is information");
        return info;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
module.exports = sendMail;
