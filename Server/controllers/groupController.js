
import Group from '../models/groupModel.js';
import User from '../models/userModel.js';

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

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(403).json({ message: 'You are not allowed to view this group' });
        }

        await group.populate('members', 'name profilePic status');

        let lastMessage = group.messages[group.messages.length - 1];

        let endgroup = group.toObject();

        endgroup.lastMessage = lastMessage?.text || 'No messages yet';
        endgroup.lastMessageTime = lastMessage?.createdAt || 'No messages yet';

        endgroup.lastMessageUser = lastMessage ? await User.findById(lastMessage.sender) : 'No messages yet';

        res.status(200).json(endgroup);
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

// Next to clean up the code, we can create a function to check if the user is the owner of the group or not.
const quitGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.owner.toString() === req.user._id.toString()) {
            return res.status(403).json({ message: 'Owner cannot quit the group' });
        }

        if (!group.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are not in the group' });
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

export { createGroup, getGroupInfo, changeName, changeIcon, changeOwner, deleteGroup, addUserToGroup, removeUserFromGroup, quitGroup };







