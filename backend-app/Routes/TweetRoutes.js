const express = require("express");
const router = express.Router();
const Tweet = require("../Models/Tweet");
const User = require("../Models/User");


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

// Récupérer tous les tweets
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("user", "username");
    res.json(tweets);
  } catch (error) {
    console.error("Erreur lors de la récupération des tweets :", error); // Affiche l'erreur dans la console
    res.status(500).json({ message: "Erreur serveur", error: error.message }); // Renvoie l'erreur au client
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

// Créer un retweet
router.post("/retweet", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
