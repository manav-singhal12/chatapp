import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error in fetching users:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
