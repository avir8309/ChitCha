const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is not registered",
            });
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (passwordMatch) {
            const payload = {
                email: existingUser.email,
                
                id: existingUser._id,
                

            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            // Clear sensitive data
            existingUser.password = undefined;
            existingUser.token = token;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: existingUser,
                message: "User logged in successfully"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Password incorrect"
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
