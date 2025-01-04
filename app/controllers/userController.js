const bcrypt = require('bcrypt');
const Joi = require('joi');
const userModel = require('../models/userModel'); // Import the user model

const userSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

exports.createUser = async (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { first_name, last_name, email, password } = value;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { first_name, last_name, email, password: hashedPassword };

        userModel.createUser(userData, (err, userId) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(400).json({ error_message: 'Email already registered' });
                }
                return res.status(500).json({ error_message: 'Database error' });
            }
            res.status(201).json({ user_id: userId });
        });
    } catch (err) {
        res.status(500).json({ error_message: 'Internal server error' });
    }
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    userModel.getUserByEmail(email, async (err, user) => {
        if (err || !user) return res.status(401).json({ error_message: 'Invalid credentials' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error_message: 'Invalid credentials' });

        res.status(200).json({ user_id: user.user_id, message: 'Login successful' });
    });
};