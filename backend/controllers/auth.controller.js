const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");


const register = async (req, res) => {
    const { email, password, name, avatar } = req.body;
    
    // Validate required fields
    if (!email || !password || !name) {
        return res.status(400).json({ success: false, message: "Email, password, and name are required" });
    }
    
    try {

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        user = new User({
            email,
            password,
            name,
            avatar: avatar || ""
        })

        // Hash password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user to database
        await user.save();

        // generate JWT token

        const token = generateToken(user);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log("Registration error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { register, login };