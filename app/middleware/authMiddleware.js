const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers['x-authorization'];
    if (!token) return res.status(401).json({ error_message: 'Access token required' });

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).json({ error_message: 'Invalid or expired token' });
    }
};