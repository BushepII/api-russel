const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.authenticateUser = async (email, password) => {
    const user = await User.findOne({
        email: email.toLowerCase()
    }).select('+password');

    if (!user) {
        return null;
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password
    );

    if (!validPassword) {
        return null;
    }

    return user;
}