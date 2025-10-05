function registerUserEvents(io, socket) {
    socket.on("testSocket", (data) => {
        socket.emit("testSocket",{ msg: "Real time update!"});
    });
}

module.exports = { registerUserEvents };
