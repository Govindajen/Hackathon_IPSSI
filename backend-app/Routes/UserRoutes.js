const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Tweet = require("../Models/Tweet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  console.log(req.body)
    try {
        const { username, email, password } = req.body
        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: "7d",
        })

        await user.save()
        res.status(201).json({ status: true, user: {id: user._id, username: user.username, email: user.email}, token: token})
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error})
    }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect" })
        }
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.json({ user: payload, token })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" })
    }
});

//Récupérer un utilisateur
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Récupérer un utilisateur
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

//Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself");
    }
});

// Récupérer les signets d'un utilisateur
router.get("/:id/bookmarks", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const bookmarks = await Tweet.find({ signet: user._id }).populate("user", "username").populate({ path: "retweets", populate: { path: "user", select: "username" } });
    ;
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;