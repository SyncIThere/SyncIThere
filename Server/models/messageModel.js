
import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    location: {
        type: {
            type: String,
            required: true,
            enum: ['group', 'server'],
            default: 'group',
        },
        server: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Server',
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        },
    },
    updated: {
        type: Boolean,
        default: false,
    },
    reactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;


