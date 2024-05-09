
import Group from '../models/groupModel.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

const createGroup = async (req, res) => {
    try {
        let { name, members } = req.body;

        if (!members) members = [];

        if (members && !Array.isArray(members)) {
            return res.status(400).json({ message: 'Members should be an array' });
        }

        members.unshift(req.user.name);

        if (members.length > 10) {
            return res.status(400).json({ message: 'Maximum 10 members allowed' });
        }

        name = !name ? members.join(', ') : name;

        const membersIds = [];

        for (let member of members) {
            const user = await User.findOne({ name: member });

            if (!user) {
                return res.status(404).json({ message: `${member} not found` });
            }

            membersIds.push(user._id);
        }

        const newGroup = new Group({
            name,
            owner: req.user._id,
            members: [...membersIds],
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

const getGroupInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const { page = 1, limit = 10 } = req.query;

        let group = await Group.findById(id).populate('members', 'name profilePic status').populate('owner', 'name profilePic status').populate('lastMessage', 'text createdAt sender').populate({ path: 'messages', options: { sort: { createdAt: -1 }, limit: limit * 1, skip: (page - 1) * limit } });

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.map(member => member._id.toString()).includes(req.user._id.toString())) {
            return res.status(403).json({ message: 'You are not allowed to view this group' });
        }

        const totalMessages = await Message.countDocuments({ _id: { $in: group.messages } });

        group = group.toObject();

        group.totalMembers = group.members.length;
        group.totalMessages = totalMessages;
        group.totalPages = Math.ceil(totalMessages / limit);
        group.currentPage = page;

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const changeName = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not allowed to change the name of this group' });
        }

        group.name = name;
        await group.save();

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const changeIcon = async (req, res) => {
    try {
        const { id } = req.params;
        const { icon } = req.body;

        if (!icon) {
            return res.status(400).json({ message: 'Icon is required' });
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not allowed to change the icon of this group' });
        }

        group.icon = icon;
        await group.save();

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const changeOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { newOwner } = req.body;

        if (!newOwner) {
            return res.status(400).json({ message: 'New owner name is required' });
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not allowed to change the owner of this group' });
        }

        const user = await User.findOne({ name: newOwner });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        group.owner = user._id;
        await group.save();

        res.status(200).json(group);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not allowed to delete this group' });
        }

        await Group.findByIdAndDelete(id);

        res.status(200).json({ message: 'Group deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const addUserToGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;

        const user = await User.findOne({ name: userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.members.includes(user._id.toString())) {
            return res.status(400).json({ message: 'User already in the group' });
        }

        group.members.push(user._id.toString());
        await group.save();

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const removeUserFromGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;

        const user = await User.findOne({ name: userName });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not allowed to remove users from this group' });
        }

        if (!group.members.includes(user._id.toString())) {
            return res.status(400).json({ message: 'User not in the group' });
        }

        if (group.members.length === 1) {
            await Group.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Group deleted successfully' });
        }

        group.members = group.members.filter(member => member.toString() !== user._id.toString());

        if (group.owner.toString() === user._id.toString()) {
            group.owner = group.members[0];
        }

        await group.save();

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

// Next to clean up the code, done in flight
const quitGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are not in the group' });
        }

        if (group.members.length() === 1) {
            await Group.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Group deleted successfully' });
        }

        if (group.owner.toString() === req.user._id.toString()) {
            group.owner = group.members[0];
        }

        group.members = group.members.filter(member => member.toString() !== req.user._id.toString());
        await group.save();

        res.status(200).json(group);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const addMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const { message, replyTo } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        if (replyTo) {
            const messageReply = await Message.findById(replyTo);

            if (!messageReply) {
                return res.status(404).json({ message: 'Message to reply to not found' });
            }
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(req.user._id.toString())) {
            return res.status(400).json({ message: 'You are not in the group' });
        }

        const newmessage = new Message({
            message,
            sender: req.user._id,
            replyTo,
            location: {
                type: 'group',
                group: group._id,
            }
        })

        await newmessage.save();

        group.messages.push(newmessage._id);

        group.lastMessage = newmessage._id;

        await group.save();

        res.status(201).json(newmessage)

    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const deletMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const { idmessage } = req.body;

        const message = await Message.findById(idmessage.toString())

        if (!message) {
            return res.status(404).json({ message: 'Message not found' })
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: 'You are not the sender of this message' });
        }

        if (!group.messages.includes(idmessage.toString())) {
            return res.status(400).json({ message: 'This message is not in this group' });
        }

        group.messages = group.messages.filter(mess => mess.toString() !== message._id.toString())

        if (group.lastMessage.toString() === message._id.toString()) {
            group.lastMessage = group.messages[group.messages.length - 1];
        }

        await group.save();

        await Message.findByIdAndDelete(message._id.toString());

        res.status(200).json({ message: 'Message deleted successfuly' })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const { idmessage, message } = req.body;

        const mess = await Message.findById(idmessage.toString())

        if (!mess) {
            return res.status(404).json({ message: 'Message not found' })
        }

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (mess.sender.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: 'You are not the sender of this message' });
        }

        if (!group.messages.includes(idmessage.toString())) {
            return res.status(400).json({ message: 'This message is not in this group' });
        }

        if (!message || message === '') {
            return res.status(400).json({ message: 'Message is required' });
        }

        mess.updated = true;
        mess.message = message;
        await mess.save();

        res.status(200).json(mess);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const getMessages = async (req, res) => {
    try {
        const { id } = req.params;

        const { page = 1, limit = 10 } = req.query;

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(req.user._id.toString())) {
            return res.status(400).json({ message: 'You are not in the group' });
        }

        let messages = await Message.find({ _id: { $in: group.messages } }).populate('sender', 'name profilePic status').populate('replyTo', 'message sender').populate('replyTo.sender', 'name profilePic status').sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);

        for (let message of messages) {
            if (message.replyTo) {
                const resenderinfo = await User.findById(message.replyTo.sender._id).select('name profilePic status');
                message.replyTo.sender = resenderinfo;
            }
        }

        let endmessages = {};

        endmessages.messages = messages;
        endmessages.totalMessages = group.messages.length;
        endmessages.totalPages = Math.ceil(group.messages.length / limit);
        endmessages.currentPage = page;

        res.status(200).json(endmessages);

    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}





export { createGroup, getGroupInfo, changeName, changeIcon, changeOwner, deleteGroup, addUserToGroup, removeUserFromGroup, quitGroup, addMessage, deletMessage, updateMessage, getMessages };







