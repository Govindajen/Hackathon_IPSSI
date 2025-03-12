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
    const tweets = await Tweet.find().populate("user", "username").populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    });
    res.json(tweets);
  } catch (error) {
    console.error("Erreur lors de la récupération des tweets :", error); // Affiche l'erreur dans la console
    res.status(500).json({ message: "Erreur serveur", error: error.message }); // Renvoie l'erreur au client
  }
});


//Récupérer un tweet
router.get("/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("user", "username").populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    });
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Supprimer un tweet avec confirmation
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

    const tweetToReturn = await Tweet.findById(newTweet._id).populate("user", "username").populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    });
    res.status(201).json(tweetToReturn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mettre à jour un tweet en ajoutant un like
router.put("/:id/like", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    if (!tweet.likes) {
      tweet.likes = [];
    }
    if (tweet.likes.includes(req.body.userId)) {
      tweet.likes = tweet.likes.filter(userId => userId.toString() !== String(req.body.userId));
    } else {
      tweet.likes.push(req.body.userId);
    }
    const updatedTweet = await tweet.save();
    const populatedTweet = await Tweet.findById(updatedTweet._id).populate("user", "username").populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    });

    res.json({like: true, tweet: populatedTweet});
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

// Créer un commentaire
router.post("/commentaire", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Créer un signet
router.post("/signet", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    const newTweet = await tweet.save();
    res.status(201).json(newTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




module.exports = router;
