const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const City = require('../models/City');
const Brand = require('../models/Brand');
const Model = require('../models/Model');
const Fuel = require('../models/Fuel');
const Service = require('../models/Service');
const Cart = require('../models/Cart');
const Booking = require('../models/Booking');


const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Backend is running")
})

router.get("/cities", async (req, res) => {
    try {
        const cities = await City.find().select("name icon");
        res.json(cities);
    }
    catch (err) {
        res.status(500).json({ msg: "Error fetching cities:", error: err.message })
    }
});

router.get("/brands", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    }
    catch (err) {
        res.status(500).json({ msg: "Error fetching brands:", error: err.message })
    }
});

router.get("/models", async (req, res) => {
    try {
        const { brand } = req.query;
        if (!brand || brand === "undefined") return res.status(400).json({ msg: "Brand ID is required!" });

        console.log("✅ Brand in Request:", brand);

        const models = await Model.find({ brand: new mongoose.Types.ObjectId(brand) })
            .select("modelName brand imageUrl")
            .populate("brand", "brand");
        if (!models.length) return res.status(404).json({ msg: "No models found for this brand!" });

        res.json(models);
        console.log("Model Fetched:", models);
    } catch (err) {
        console.error("🚨 Error fetching models:", err);
        res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});

router.get("/fuel", async (req, res) => {
    try {
        const { model } = req.query;
        if (!model || !mongoose.isValidObjectId(model)) return res.status(400).json({ msg: "Invalid Model ID format!" });

        console.log("✅ Received Model ID:", model);

        const fuelTypes = await Fuel.findOne({ carModel: new mongoose.Types.ObjectId(model) }).select("fuelTypes icon");
        if (!fuelTypes || fuelTypes.fuelTypes.length === 0)
            return res.status(404).json({ msg: "Fuel types not found for this model!" });

        res.json({ _id: fuelTypes._id, fuelTypes: fuelTypes.fuelTypes.flat() });
    } catch (err) {
        console.error("Error fetching fuel types:", err);
        res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});

router.get('/services', async (req, res) => {
    try {
        const { brand, model, fuel } = req.query;
        console.log("Received API Request:", req.query);

        if (!brand || !model || !fuel) {
            return res.status(400).json({ message: "Missing required parameters" });
        }

        const services = await Service.find({ carBrand: brand, carModel: model, fuelType: fuel }).lean();

        console.log("Fetched Services:", JSON.stringify(services, null, 2));

        if (!services.length) {
            return res.status(404).json({ message: "No services found for this selection" });
        }

        res.json({ success: true, services });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/brands', async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands);
})

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ msg: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hash });

        res.status(201).json({ msg: "User Registerd", user: newUser });

    } catch (err) {
        res.status(500).json({ msg: "Error Registering", err });
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid Credentials" });

        await User.findByIdAndUpdate(user._id, { status: "Online" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ msg: "Login Successful", token, user, userId: user._id });

    } catch (err) {
        res.status(500).json({ msg: "Login Failed", err });
    }
});

router.post('/cart', async (req, res) => {
    try {
        const { userId, serviceId } = req.body;

        console.log("Received Data:", req.body);

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({ userId, services: [serviceId] });
        } else {
            if (!cart.services.includes(serviceId)) {
                cart.services.push(serviceId);
                await cart.save();
            }
        }

        res.json({ success: true, cart });

    } catch (error) {
        console.error("Error in Add to Cart:", error);
        res.status(500).json({ msg: "Server Error", error });
    }
});

router.post('/cart/add', async (req, res) => {
    try {
        const { userId, serviceId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, services: [] });
        }

        const exists = cart.services.some(service => service._id.toString() === serviceId);
        if (exists) {
            return res.status(400).json({ msg: "Service already in cart!" });
        }

        const service = await Service.findOne({ "services._id": serviceId }, { "services.$": 1 });
        if (!service) return res.status(404).json({ msg: "Service not found!" });

        cart.services.push({
            _id: service.services[0]._id,
            name: service.services[0].name,
            price: service.services[0].price,
            imgUrl: service.services[0].imgUrl,
            description: service.services[0].description,
            duration: service.services[0].duration
        });

        await cart.save();
        res.json({ success: true, cart });

    } catch (error) {
        console.error("Error Adding to Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

router.post('/cart/remove', async (req, res) => {
    try {
        const { userId, serviceId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ msg: "Cart not found!" });


        cart.services = cart.services.filter(service => service._id.toString() !== serviceId.toString());

        await cart.save();
        res.json({ success: true, cart });

    } catch (error) {
        console.error("Error Removing from Cart:", error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});


router.get('/cart/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("Fetching Cart for User:", userId);

        let cart = await Cart.findOne({ userId }).populate({ path: "services", select: "name price" });

        if (!cart) {
            return res.status(404).json({ msg: "Cart not found", cart: null });
        }
        console.log("Fetched Cart Data:", JSON.stringify(cart, null, 2));

        res.json({ success: true, cart });

    } catch (error) {
        console.error("Error in Fetching Cart:", error);
        res.status(500).json({ msg: "Server Error", error });
    }
});

router.post('/book-service', async (req, res) => {
    try {
        const { userId, services, totalAmount, brand, model, fuelTypes, imageUrl } = req.body;

        console.log("Received Booking Data:", JSON.stringify(req.body, null, 2));

        if (!userId || !services || services.length === 0) {
            return res.status(400).json({ msg: "Invalid booking request!" });
        }

        const booking = new Booking({
            userId,
            services,
            totalAmount,
            brand,
            model,
            fuelTypes,
            imageUrl,
            status: "Confirmed"
        });

        await booking.save();
        console.log("Final Stored Booking Data:", JSON.stringify(booking, null, 2));
        res.json({ success: true, booking });

    } catch (error) {
        console.error("Error Booking Service:", error);
        res.status(500).json({ msg: "Server Error", error });
    }
});

router.get('/get-booking/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("Fetching bookings for user:", userId);
        const bookings = await Booking.find({ userId }).populate({
            path: "services",
            select: "name price description duration imageUrl",
        }).sort({ createdAt: -1 }).limit(1);

        console.log("Fetched Bookings Data:", JSON.stringify(bookings, null, 2));

        if (!bookings.length) return res.status(404).json({ msg: "No bookings found!" });

        res.json({ success: true, bookings });

    } catch (error) {
        console.error("Error Fetching Bookings:", error.message || error);
        res.status(500).json({ msg: "Server Error", error: error.message || error });
    }
});

router.post("/booking/remove", async (req, res) => {
    try {
        const { bookingId, serviceId } = req.body;

        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: bookingId },
            { $pull: { services: { _id: serviceId } } },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ updatedBooking });
    } catch (error) {
        console.error("Error removing service from booking:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/logout', async (req, res) => {

    try {
        await User.findByIdAndUpdate(req.user.id, { status: "Offline" });
        res.json({ msg: "Logout Successful" });
    } catch (err) {
        res.status(500).json({ msg: "Logout Failed", err });
    }
}
);

router.post('/admin', async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user || user.role !== "admin") {
            return res.status(403).json({ msg: "Access Denied! Admins only" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ msg: "Admin Login Successful", token, user });

    } catch (err) {
        res.status(500).json({ msg: "Login Failed", err });
    }
});



module.exports = router;