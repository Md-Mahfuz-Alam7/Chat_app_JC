// const dotenv = require('dotenv');
// import { Server as SocketIOServer, Socket } from 'socket.io';
// import jwt from 'jsonwebtoken';

// dotenv.config();

// export function InitializeSocket(server: any): SocketIOServer {
//     const io = new SocketIOServer(server, {
//         cors: {
//             origin: "*", //allow all rigins
//         }, // socket io server instance
//     });

//     // auth middleware
//     io.use((socket: Socket, next) => {
//         const token = socket.handshake.auth.token;
//         if (!token) {
//             return next(new Error("Authentication error : no token provided"));
//         }
//         jwt.verify(token, process.env.JWT_SECRET as string, (err: AnyARecord, decoded: any) => {
//             if (err) {
//                 return next(new Error("Authentication error : invalid token"));
//             }
//             // attach user data to socket
//             let userData = decoded.user;
//             socket.data = userData;
//             socket.data.userId = userData.id;
//             next();
//             // verify token
//             // if valid, attach user data to socket
//             // if not valid, return error

//         }
//     );
// });

// // when socket connects, register events
// io.on('connection', async (socket: Socket) => {
//     const userId = socket.data.userId;
//     console.log(`User connected: ${userId}, username: ${socket.data.name}`);
   
//     // register events

//     socket.on('disconnect', () => {
//         //user logs out
//         console.log(`Socket disconnected: ${userId}`);
//     });
// })

// return io;
// }

const dotenv = require('dotenv');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { registerUserEvents } = require('./userEvents');
const { registerChatEvents } = require('./chatEvents');
const Conversation = require('../modals/Conversation');

dotenv.config();

function InitializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", //allow all origins
        }, // socket io server instance
    });

    // auth middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error : no token provided"));
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error("Authentication error : invalid token"));
            }
            // attach user data to socket
            let userData = decoded.user;
            socket.data = userData;
            socket.data.userId = userData.id;
            next();
        });
    });

    // when socket connects, register events
    io.on('connection', async (socket) => {
        const userId = socket.data.userId;
        console.log(`User connected: ${userId}, username: ${socket.data.name}`);
       
        // register events

        registerChatEvents(io, socket);
        registerUserEvents(io, socket);

        // join all the conversations the user is part of
        try{
            const conversations = await Conversation.find({
                participants: userId
            }).select("_id");

            conversations.forEach((conversation) => {
                socket.join(conversation._id.toString());
            });
            
        }catch(error){
            console.log("Error joining conversations", error);
        }

        socket.on('disconnect', () => {
            //user logs out
            console.log(`Socket disconnected: ${userId}`);
        });
    });

    return io;
}

module.exports = { InitializeSocket };
