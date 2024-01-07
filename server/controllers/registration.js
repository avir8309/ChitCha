const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Store hashed password in database
            
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error:error
        });
    }
};
