const mongoose = require('mongoose');
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

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body ?? {};

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }
        
        const data = {}

        if (name !== undefined) {
            data.name = name.trim();
        }

        if (email !== undefined) {
            data.email = email.trim().toLowerCase();
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: 'No valid fields to update'
            });
        }

        const user = await userService.updateUser(id, data);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User updated successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const user = await userService.deleteUser(id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        return res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}