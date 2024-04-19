
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    profilePic: {
        type: String,
        default: '',
        // required: true,
        // default: '/images/profilePic.jpg',
    },
    bio: {
        type: String,
        default: '',
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    sentRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    status: {
        type: String,
        default: 'offline',
    },

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
