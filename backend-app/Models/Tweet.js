const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
    content: { type: String, required: true, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    retweets: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    hashtags: [{ type: String, default: [] }],
    commentaire: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet", default: [] }],
    signet: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet", default: [] }],
    media: { type: String, default: null },
    date: { type: Date, default: Date.now },
}, { timestamps: true });



const Tweet = mongoose.model("Tweet", TweetSchema, "tweets");

module.exports = Tweet;