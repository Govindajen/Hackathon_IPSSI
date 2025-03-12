const express = require('express');
const router = express.Router();
const Tweet = require('../Models/Tweet');
const User = require('../Models/User');

// Recherche avancée
router.get('/search', async (req, res) => {
    const { query, type, startDate, endDate, sortBy } = req.query;

    try {
        let results = [];

        if (type === 'tweets') {
            const searchCriteria = {
                content: { $regex: query, $options: 'i' },
                ...(startDate && { createdAt: { $gte: new Date(startDate) } }),
                ...(endDate && { createdAt: { $lte: new Date(endDate) } }),
            };
            results = await Tweet.find(searchCriteria).populate('user', 'username').sort({ [sortBy]: -1 });
        } else if (type === 'users') {
            results = await User.find({ username: { $regex: query, $options: 'i' } });
        } else if (type === 'hashtags') {
            results = await Tweet.find({ hashtags: { $regex: query, $options: 'i' } }).populate('user', 'username').sort({ [sortBy]: -1 });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }
});

module.exports = router;