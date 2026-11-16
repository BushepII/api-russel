const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    });

    return await user.save();
}

exports.updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
}

exports.deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
}