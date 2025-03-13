const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    emotions: [{
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet", required: true },
        emotion: { type: String, required: true }
    }],
    bio: { type: String, default: "" },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;