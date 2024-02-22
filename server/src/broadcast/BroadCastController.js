const Broadcast = require("../../db/BroadCast.js");

const CreateMessage = async (req, res) => {
    try {
        const { Message, SenderId, ReceiverId, Status } = req.body;
        const createdMessage = await Broadcast.create({
            Message: Message,
            SenderId: SenderId,
            ReceiverId: ReceiverId,
            Status: Status,
        });
        res.status(201).json({
            success: true,
            message: "Broadcast message created successfully",
            data: createdMessage,
        });
    } catch (error) {
        console.error("Error creating broadcast message:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const getMessage = async (req, res) => {
    try {
        const find = Broadcast.findAll({})
        return res.status(201).json({ message: "Getting All Messages", data: find })
    } catch (error) {
        console.log("error")
        res.status(500).json({ message: "internal Server Errorr" })
    }
}
module.exports = { CreateMessage, getMessage };
