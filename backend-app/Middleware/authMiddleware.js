const jwt = require("jsonwebtoken");
const User = require("../Models/User");

// Vérifier le token JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Accès refusé" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

// Vérifier si l'utilisateur est un administrateur
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Accès refusé : Administrateur requis" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};




module.exports = { verifyToken, isAdmin };
