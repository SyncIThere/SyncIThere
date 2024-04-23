
import mongoose from "mongoose";

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    icon: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    pinnedMessages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ]
}, {
    timestamps: true,
});

const Group = mongoose.model("Group", groupSchema);

export default Group;
