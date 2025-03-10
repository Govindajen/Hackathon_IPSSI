const mongoose = require("mongoose");

const NotifSchema = new mongoose.Schema({
    content: { type: String, required: true },
    type: { type: String, required: true },
    sendby: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sendfor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Notif", NotifSchema);
