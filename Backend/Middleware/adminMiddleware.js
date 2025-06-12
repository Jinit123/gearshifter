const adminMiddleware = (req, res, next) => {
    console.log("🔹 Checking User Role:", req.user?.role);

    if (!req.user) {
        console.error("Error: req.user is undefined! Headers:", req.headers.authorization);
        return res.status(403).json({ msg: "Access Denied! User not recognized." });
    }

    console.log("Middleware Passed! User Info:", req.user);

    if (req.user.role !== "admin") {
        console.error("Error: User is not admin!", req.user);
        return res.status(403).json({ msg: "Access Denied! Admins only." });
    }
    req.adminId = req.user?.id;

    console.log("User Role Verified:", req.user.role, "Admin ID:", req.adminId);
    next();
};
module.exports = adminMiddleware;