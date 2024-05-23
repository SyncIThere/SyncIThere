
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token', token: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

const setUserInfo = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');

        req.user = user;

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
}

export { protectRoute, setUserInfo };
