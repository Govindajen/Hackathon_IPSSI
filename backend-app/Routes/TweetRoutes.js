const express = require("express");
const router = express.Router();
const Tweet = require("../Models/Tweet");
const User = require("../Models/User");


//Créer un tweet
router.post("/", async (req, res) => {
  try {
    const tweet = new Tweet(req.body);
    const newTweet = await tweet.save();

    const tweetToReturn = await Tweet.findById(newTweet._id).populate("user", "username")

    res.status(201).json(tweetToReturn);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});




// Récupérer tous les tweets 
router.get("/", async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("user", "username")
    .populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    }).populate({
      path: "commentaire",
      populate: {
      path: "userId",
      select: "username"
      }
    })
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

// Ajouter un tweet aux signets
router.post("/:id/bookmark", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    if (!tweet.signet) {
      tweet.signet = [];
    }
    if (tweet.signet.includes(req.body.userId)) {
      tweet.signet = tweet.signet.filter(userId => userId.toString() !== String(req.body.userId));
    } else {
      tweet.signet.push(req.body.userId);
    }
    const updatedTweet = await tweet.save();
    const populatedTweet = await Tweet.findById(updatedTweet._id).populate("user", "username").populate({
      path: "retweets",
      populate: {
      path: "user",
      select: "username"
      }
    });
    res.json({bookmark: true, tweet: populatedTweet});
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});


// récupérer les signets d'un utilisateur
router.get("/:id/bookmarks", async (req, res) => {
  try {
    const user =
      await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const bookmarks = await Tweet.find({ signet: user._id }).populate("user", "username").populate({ path: "retweets", populate: { path: "user", select: "username" } });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Créer un commentaire
router.post("/commentaire/:id", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    if (!tweet.commentaire) {
      tweet.commentaire = [];
    }
    tweet.commentaire.push(req.body.comment);
    const updatedTweet = await tweet.save();
    const populatedTweet = await Tweet.findById(updatedTweet._id).populate("user", "username").populate({
      path: "commentaire",
      populate: {
        path: "userId",
        select: "username"
      }
    });
    res.status(201).json(populatedTweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un commentaire
router.delete("/commentaire/:id/:commentId", async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ message: "Tweet non trouvé" });
    }
    tweet.commentaire = tweet.commentaire.filter(comment => comment._id.toString() !== req.params.commentId);
    const updatedTweet = await tweet.save();
    res.status(200).json({delete: true, updatedTweet});
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

// fonction de recherche de tweet par username de l'utilisateur
router.get("/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const tweets = await Tweet.find({ user: user._id }).populate("user", "username").populate({
      path: "retweets",
      populate: {
        path: "user",
        select: "username"
      }
    });
    res.json(tweets);
  } catch (error) {
    console.error("Erreur lors de la récupération des tweets par username :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});




module.exports = router;
