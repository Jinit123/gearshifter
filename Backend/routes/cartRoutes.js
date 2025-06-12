const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Service = require('../models/Service');

// ✅ Add service to cart
router.post('/cart/add', async (req, res) => {
    try {
        const { userId, serviceId } = req.body;

        if (!userId || !serviceId) {
            return res.status(400).json({ msg: "Missing required fields!" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, services: [] });
        }

        // Avoid duplicates
        const alreadyAdded = cart.services.some(
            (service) => service.toString() === serviceId
        );
        if (!alreadyAdded) {
            cart.services.push(serviceId);
            await cart.save();
        }

        // Populate for return
        const populatedCart = await cart.populate('services');

        res.json({ success: true, cart: populatedCart });
    } catch (error) {
        console.error("Error Adding to Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

// ✅ Remove service from cart
router.post('/remove', async (req, res) => {
    try {
        const { userId, serviceId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ msg: "Cart not found!" });

        cart.services = cart.services.filter(
            (service) => service.toString() !== serviceId
        );
        await cart.save();

        const populatedCart = await cart.populate('services');

        res.json({ success: true, cart: populatedCart });
    } catch (error) {
        console.error("Error Removing from Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

// ✅ Fetch user cart
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("services", "name price");
        if (!cart) return res.status(404).json({ msg: "Cart not found!" });

        res.json({ success: true, cart });
    } catch (error) {
        console.error("Error Fetching Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

// ✅ Clear user cart
router.post('/clear', async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ msg: "Cart not found!" });

        cart.services = [];
        await cart.save();

        res.json({ success: true, cart });
    } catch (error) {
        console.error("Error Clearing Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

module.exports = router;
