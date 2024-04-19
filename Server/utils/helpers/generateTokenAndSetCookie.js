
import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt', token, {
        httpOnly: true, // to disable access to the cookie via client side js
        maxAge: 15 * 24 * 60 * 60 * 1000, // cookie will expire in 15 days
        sameSite:'strict', // CSRF protection
    });

    return token;

}

export default generateTokenAndSetCookie;

