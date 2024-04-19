
import mongoose from 'mongoose';

const reactionSchema = mongoose.Schema({
    reaction: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
    },
}, {
    timestamps: true,
});

const Reaction = mongoose.model('Reaction', reactionSchema);

export default Reaction;

