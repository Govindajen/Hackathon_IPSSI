const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    bio: { type: String, default: "" },
    
}, { timestamps: true });

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;