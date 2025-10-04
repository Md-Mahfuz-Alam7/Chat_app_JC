
import {API_URL} from "../constants/index";
import {io} from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

let socket = null;

export async function connectSocket() {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
        throw new Error("No token found. User must login first");
    }
    if (!socket) {
        socket = io(API_URL, {
            auth: {token}
        });

        // wait for connection
        await new Promise((resolve) => {
            socket?.on("connect", () => {
                console.log("Connected to socket", socket?.id);
                resolve(true);
            });
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
    }
    return socket;
}

export function getSocket() {
    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
