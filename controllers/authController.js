const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (
            typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await authService.authenticateUser(
            email.trim(),
            password
        );

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email of password'
            });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            message: 'Authentication successful',
            token
        });

    } catch(error) {
        console.log(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}