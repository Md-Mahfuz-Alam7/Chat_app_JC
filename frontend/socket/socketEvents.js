import {getSocket} from './socket'

export const testSocket = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("testSocket", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("testSocket", payload); // call back for this event 
    }
    else{
        socket.emit("testSocket", payload); // seending payload as data
    }
}


export const updateProfile = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("updateProfile", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("updateProfile", payload); // call back for this event 
    }
    else{
        socket.emit("updateProfile", payload); // seending payload as data
    }
}


export const getContacts = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("getContacts", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("getContacts", payload); // call back for this event 
    }
    else{
        socket.emit("getContacts", payload); // seending payload as data
    }
}


export const newConversation = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("newConversation", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("newConversation", payload); // call back for this event 
    }
    else{
        socket.emit("newConversation", payload); // seending payload as data
    }
}


export const getConversations = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("getConversations", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("getConversations", payload); // call back for this event 
    }
    else{
        socket.emit("getConversations", payload); // seending payload as data
    }
}

export const newMessage = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("newMessage", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("newMessage", payload); // call back for this event 
    }
    else{
        socket.emit("newMessage", payload); // seending payload as data
    }
}

export const getMessages = (payload, off = false) => {
    const socket = getSocket();
    if(!socket) {
        console.log("socket is not connected");
        return;
    }

    if(off){
        //turn off this listing to event
        socket.off("getMessages", payload); // payload is the callback
    }
    else if(typeof payload == 'function'){
        socket.on("getMessages", payload); // call back for this event 
    }
    else{
        socket.emit("getMessages", payload); // seending payload as data
    }
}