const userService = require('../services/userService');

exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== 'string' || !name.trim() ||
            typeof email !== 'string' || !email.trim() ||
            typeof password !== 'string' || password.length < 8
        ) {
            return res.status(400).send('Invalid registration data');
        }

        const user = await userService.createUser(name.trim(), email.trim().toLowerCase(), password);

        return res.status(201).json({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).send('Email already exists');
        }

        return res.status(500).send('Internal server error');
    }
}