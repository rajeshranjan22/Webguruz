const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    tokenVersion: {
        type: Number,
        default: 0
    }
});

const UserModel = mongoose.model("user", UserSchema)

module.exports = {
    UserModel
}