function registerUserEvents(io, socket) {
    socket.on("testSocket", (data) => {
        socket.emit("msg", "its working!!!");
    });
}

module.exports = { registerUserEvents };
