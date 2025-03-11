const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    retweets: { type: mongoose.Schema.Types.ObjectId, ref: "tweets"},
    hashtags: [{ type: String }],
    commentaire: [{ type: mongoose.Schema.Types.ObjectId, ref: "tweets" }],
    signet: { type: mongoose.Schema.Types.ObjectId, ref: "tweets" },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("tweets", TweetSchema);