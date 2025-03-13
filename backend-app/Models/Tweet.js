const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    retweets: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    hashtags: [{ type: String, default: [] }],
    commentaire: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true }
    }],
    signet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet", default: [] }],
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Tweet = mongoose.model("Tweet", TweetSchema, "tweets");

module.exports = Tweet;