const express = require('express');
const router = express.Router();
const { summarizeText } = require('./aiFeatures');

router.post('/summarize', async (req, res) => {
    const { text } = req.body;
    try {
        const summary = await summarizeText(text);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ error: 'Failed to summarize text' });
    }
});

module.exports = router;