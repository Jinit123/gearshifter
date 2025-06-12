const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth/cart', cartRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'Public/uploads')));
app.use('/logos', express.static(path.join(__dirname, 'Public/uploads/logos')))




const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    }).catch((err) => console.log("Error in Connecting", err))