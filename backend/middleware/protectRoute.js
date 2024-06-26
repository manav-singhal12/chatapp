// protectRoute.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user; // Attach the user object to the request
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Unauthorized - Token has expired" });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
