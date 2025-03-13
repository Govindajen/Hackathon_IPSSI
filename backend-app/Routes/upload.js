const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configurer le stockage (ici, on stocke en local dans un dossier "uploads")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route pour l'upload d'image
router.post("/", upload.single("file"), (req, res) => {
  try {
    // On peut renvoyer l'URL de l'image stockée
    res.status(201).json({ url: `http://localhost:${process.env.PORT || 3000}/uploads/${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
