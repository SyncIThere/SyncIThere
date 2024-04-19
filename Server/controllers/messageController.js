import Message from '../models/messageModel.js';

const sendMessage = async (req, res) => {
    try {
        
        const sender = req.user._id;

        const { message, replyTo } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        if (!replyTo) {
            replyTo = null;
        }else{
            const messageExists = await Message.findById(replyTo);
            if (!messageExists) {
                return res.status(400).json({ message: 'Invalid replyTo message' });
            }
        }

        const newMessage = new Message({
            message,
            sender,
            replyTo,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const messageExists = await Message.findById(id);
        if (!messageExists) {
            return res.status(400).json({ message: 'Message not found' });
        }

        messageExists.message = message;
        await messageExists.save();
        res.status(200).json(messageExists);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
};

const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user._id;

        const messageExists = await Message.findById(id);
        if (!messageExists) {
            return res.status(400).json({ message: 'Message not found' });
        }

        if (messageExists.sender.toString() !== currentUser.toString()) {
            return res.status(401).json({ message: 'You can only delete your own messages' });
        }

        await messageExists.remove();
        res.status(200).json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

export { sendMessage, updateMessage, deleteMessage };



// à vérifier non testé