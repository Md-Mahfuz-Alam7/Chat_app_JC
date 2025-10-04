// const {Schema, model} = require("mongoose");
// import { type } from "os";

// const UserSchema = new Schema<UserProps>({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     avatar: {
//         type: String,
//         default: ""
//     },
//     created: {
//         type: Date,
//         default: Date.now()
//     }
    
// })

// export default model<UserProps>("User", UserSchema);


const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", UserSchema);