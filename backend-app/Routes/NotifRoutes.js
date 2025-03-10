const express = require("express");
const router = express.Router();
const Notif = require("../Models/Notif");

//Créer une notif
router.post("/", async (req, res) => {
  try {
    const notif = new Notif(req.body);
    const newNotif = await notif.save();
    res.status(201).json(newNotif);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Récupérer toutes les notifs
router.get("/", async (req, res) => {
  try {
    const notifs = await Notif.find().populate("sendby", "username");
    res.json(notifs);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Récupérer une notif
router.get("/:id", async (req, res) => {
  try {
    const notif = await Notif.findById(req.params.id).populate("sendby", "username");
    if (!notif) {
      return res.status(404).json({ message: "Notif non trouvée" });
    }
    res.json(notif);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

//Supprimer une notif
router.delete("/:id", async (req, res) => {
  try {
    const notif = await Notif.findByIdAndDelete(req.params.id);
    if (!notif) {
      return res.status(404).json({ message: "Notif non trouvée" });
    }
    res.json({ message: "Notif supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
