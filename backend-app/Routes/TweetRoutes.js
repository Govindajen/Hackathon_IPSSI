const express = require("express");
const router = express.Router();
const Tweet = require("../Models/Tweet");

//Créer un tweet
router.post("/", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Récupérer tous les tweets
router.get("/add", async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("user", "username");
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Récupérer un tweet
router.get("/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("user", "username");
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Supprimer un tweet
router.delete("/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    res.json({ message: "Tweet supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
