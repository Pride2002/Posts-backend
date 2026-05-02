const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.status(201).json({ message: 'User created successfully', result: newUser, token});

    } catch (error) {
        res.status(500).json({ message: 'Error while registering user', error: error.message });

    }
}

module.exports = { register };