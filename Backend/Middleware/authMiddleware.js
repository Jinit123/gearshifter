const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("No token found in request headers");
        return res.status(401).json({ msg: "No token provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("Token Decoded:", req.user);
        next();
    } catch (error) {
        console.error("Invalid token:", error.message);
        return res.status(403).json({ msg: "Invalid token!" });
    }
};

module.exports = verifyToken;