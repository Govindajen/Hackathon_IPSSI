const express = require("express");
const router = express.Router();
const Tweet = require("../Models/Tweet");
const User = require("../Models/User");

router.put("/:userId", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $push: { emotions: req.body }
        }, { new: true });
        
        if (!user) {
            return res.status(404).send("User not found");
        }

        const userToSend = await User.findById(req.params.userId)
            .populate({
            path: "emotions",
            populate: {
                path: "post",
                model: Tweet
            }
            });

        res.send(userToSend);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
