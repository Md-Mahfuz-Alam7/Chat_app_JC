const User = require('../modals/User');
const generateToken = require('../utils/token');

function registerUserEvents(io, socket) {
    socket.on("testSocket", (data) => {
        socket.emit("testSocket", { msg: "Real time update!" });
    });

    socket.on("updateProfile", async (data) => {
        console.log("updateProfile event", data);

        const userId = socket.data.userId;
        if (!userId) {
            return socket.emit('updateProfile', {
                success: false,
                msg: "Unauthorized"
            })
        }

        try {
            // Extract avatar URI if avatar is an object, otherwise use as is
            const avatarValue = data.avatar && typeof data.avatar === 'object' ? data.avatar.uri : data.avatar;

            const updatedUser = await User.findByIdAndUpdate(userId,
                { name: data.name, avatar: avatarValue },
                { new: true } // will return the user with updated values
            );

            if (!updatedUser) {
                return socket.emit('updateProfile', {
                    success: false,
                    msg: "User not found"
                })
            }

            // gen token with updated user value
            const newToken = generateToken(updatedUser);

            socket.emit('updateProfile', {
                success: true,
                data: {token: newToken},
                msg: "Profile updated successfully",
            });
        } catch (error) {
            console.log('error updating profile', error);
            socket.emit('updateProfile', {
                success: false,
                msg: "Error updating profile"
            })
        }
    })
}

module.exports = { registerUserEvents };