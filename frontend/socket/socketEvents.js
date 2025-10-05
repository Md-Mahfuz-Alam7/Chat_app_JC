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