const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: String,
    attachment: String, // Fixed typo: was "attachement"

},{
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;