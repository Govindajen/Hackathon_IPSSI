const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    retweets: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet"},
    hashtags: [{ type: String }],
    commentaire: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
    signet: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Tweet = mongoose.model("Tweet", TweetSchema, "tweets");

module.exports = Tweet;