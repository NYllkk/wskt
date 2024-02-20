
const Group = require("../../db/Group.js")
const Users = require("../../db/User.js")
const CreateGroup = async (req, res) => {
    try {
        const { groupName, groupDescription, groupMembers } = req.body;
        const group = await Group.create({
            GroupName: groupName,
            GroupDescription: groupDescription,
            GroupMember: groupMembers,
        });
        res.status(201).json(group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getdata = async (req, res) => {
    try {
        const userData = await Group.findAll({});
        return res.json({ userData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { CreateGroup, getdata }