const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        const [scheme, token] = authorization.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({
                message: 'Invalid authorization format'
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ['HS256'] }
        );

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
}