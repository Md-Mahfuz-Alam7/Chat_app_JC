// const { idText } = require("typescript");
// const User = require("../modals/User");
// const {UserProps} = require("../types");
// const jwt = require("jsonwebtoken");

// module.exports = model("User", UserProps) => {
//     const payload = {
//         user: {
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             avatar: user.avatar
//         }
//     }
//     return jwt.sign(payload, process.env.JWT_SECRET, {
//         expiresIn: "30d"
//     });
// }

// // 30d for 30 days
// // 1m for 1 month
// // 1y for 1 year
// // 24h for 24 hours
// // 60s for 60 seconds


const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
        }
    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

module.exports = generateToken;

// 30d for 30 days
// 1m for 1 month
// 1y for 1 year
// 24h for 24 hours
// 60s for 60 seconds