const Conversation = require("../modals/Conversation");
const Message = require("../modals/Message");

function registerChatEvents(io, socket) {

    socket.on("getConversations", async () => {
        console.log("getConversations event");
        try {
            const userId = socket.data.userId;
            if (!userId) {
                socket.emit("getConversations", {
                    success: false,
                    msg: "Unauthenticated",
                });
            }

            // find all conversation where use is a participant
            const conversations = await Conversation.find({
                participants: userId
            })
                .sort({ updatedAt: -1 })
                .populate({
                    path: "lastMessage",
                    select: "content senderId attachment createdAt", // Fixed typo
                })
                .populate({
                    path: "participants",
                    select: "name avatar email",
                })
                .lean();

            socket.emit("getConversations", {
                success: true,
                data: conversations,
            });

        } catch (error) {
            console.log("getConversations error", error);
            socket.emit("getConversations", {
                success: false,
                msg: "Failed to fetch conversations",
            });
        }
    })

    socket.on("newConversation", async (data) => {
        console.log("newConversation", data);

        try {
            // Validate input data
            if (!data || !data.type || !data.participants || !Array.isArray(data.participants)) {
                throw new Error("Invalid conversation data");
            }

            if (data.type === 'direct') {
                // check if already exists 
                const existingConversation = await Conversation.findOne({
                    type: "direct",
                    participants: {
                        $all: data.participants, $size: 2
                    },
                }).populate({
                    path: "participants",
                    select: "name avatar email",
                }).lean();

                if (existingConversation) {
                    socket.emit("newConversation", {
                        success: true,
                        data: { ...existingConversation, isNew: false }
                    });
                    return;
                }
            }

            // create new conversation 
            const conversation = await Conversation.create({
                type: data.type,
                participants: data.participants,
                name: data.name || "", // can be empty if direct conversation
                avatar: data.avatar || "", // same
                createdBy: socket.data.userId,
            });

            // get all connected sockets 
            const connectedSockets = Array.from(io.sockets.sockets.values()).filter(
                (s) => s.data && s.data.userId && data.participants.includes(s.data.userId)
            );

            // join this conversation by all online participants
            connectedSockets.forEach(participantSocket => {
                participantSocket.join(conversation._id.toString());
            });

            // send conversation data back (populated)
            const populatedConversation = await Conversation.findById(conversation._id).populate({
                path: "participants",
                select: "name avatar email",
            }).lean();

            if (!populatedConversation) {
                throw new Error("Failed to populate conversation");
            }

            // emit conversation to all participants
            io.to(conversation._id.toString()).emit("newConversation", {
                success: true,
                data: { ...populatedConversation, isNew: true },
            });
        } catch (error) {
            console.log("newConversation error", error);
            socket.emit("newConversation", {
                success: false,
                msg: "Failed to create conversation",
            });
        }
    });

    socket.on("newMessage", async (data) => {
        console.log("newMessage event", data);
        try {
            const message = await Message.create({
                conversationId: data.conversationId,
                senderId: data.sender.id,
                content: data.content,
                attachment: data.attachment, // Fixed typo
            });

            io.to(data.conversationId).emit("newMessage", {
                success: true,
                data: {
                    id: message._id,
                    content: message.content,
                    sender: {
                        id: data.sender.id,
                        name: data.sender.name,
                        avatar: data.sender.avatar,
                    },
                    attachment: message.attachment, // Fixed typo
                    createdAt: message.createdAt,
                    conversationId: message.conversationId,
                },
            });

            // update conversation last message
            await Conversation.findByIdAndUpdate(data.conversationId, {
                lastMessage: message._id,
            });

        } catch (error) {
            console.log("newMessage error", error);
            socket.emit("newMessage", {
                success: false,
                msg: "Failed to send message",
            });
        }
    });
    socket.on("getMessages", async (data) => {
        console.log("getMessages event", data);
        try {
            const messages = await Message.find({
                conversationId: data.conversationId,
            })
            .sort({ createdAt: -1 }) // newest first
            .populate({
                path: "senderId",
                select: "name avatar",
            })
            .lean();

            const messagesWithSender = messages.map((message) => ({
                ...message,
                id: message._id,
                sender: {
                    id: message.senderId?._id,
                    name: message.senderId?.name,
                    avatar: message.senderId?.avatar,
                },
                createdAt: message.createdAt,
            }));

            socket.emit("getMessages", {
                success: true,
                data: messagesWithSender,
            });
                
        } catch (error) {
            console.log("getMessages error", error);
            socket.emit("getMessages", {
                success: false,
                msg: "Failed to fetch message",
            });
        }
    });
}

module.exports = { registerChatEvents };