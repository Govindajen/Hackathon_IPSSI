const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        res.status(201).json({ message: "Utilisateur créé" })
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" })
    }
});



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
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
        res.json({ ...payload, token })
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

module.exports = router;
