const express = require('express');
const verifyToken = require("../Middleware/authMiddleware");
const adminMiddleware = require("../Middleware/adminMiddleware");
const Stock = require('../models/Stock');

const router = express.Router();

router.get('/stocks', verifyToken, adminMiddleware, async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ err: "Failed to fetch stock" });
    }
});

router.post('/stocks', verifyToken, adminMiddleware, async (req, res) => {
    try {
        const { itemName, quantity, price } = req.body;
        const newStock = new Stock({ itemName, quantity, price });
        await newStock.save();
    } catch (err) {
        res.status(500).json({ err: "Failed to add stock" });
    }
});

router.put('/stocks/:id', verifyToken, adminMiddleware, async (req, res) => {
    try {
        const { itemName, quantity, price } = req.body;
        const updatedStock = await Stock.findByIdAndUpdate(req.params.id, { itemName, quantity, price }, { new: true });
        res.json(updatedStock);
    } catch (err) {
        res.status(500).json({ err: "Failed to update stock" });
    }
});

router.delete('/stocks/:id', verifyToken, adminMiddleware, async (req, res) => {
    try {
        await Stock.findByIdAndDelete(req.params.id);
        res.json({ message: "Stock item deleted" });
    } catch (err) {
        res.status(500).json({ err: "Failed to delete stock" });
    }
});

module.exports = router;


