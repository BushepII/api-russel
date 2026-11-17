const catwayService = require('../services/catwayService');

exports.addCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body ?? {};

        if (
            typeof catwayNumber !== 'number' || !Number.isInteger(catwayNumber) ||
            typeof type !== "string" ||
            typeof catwayState !== "string" || !catwayState.trim()
        ) {
            return res.status(400).send('Invalid registration data');
        }

        const normalizedType = type.trim().toLocaleLowerCase();

        if (normalizedType !== "short" && normalizedType !== 'long') {
            return res.status(400).json({
                message: 'Type must be short or long'
            });
        }

        const catway = await catwayService.createCatway(catwayNumber, normalizedType, catwayState.trim());

        return res.status(201).json({
            message: 'Catway created successfully',
            catway
        });
    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Catway number already exists'
            });
        }

        return res.status(500).send('Internal server error');
    }
}

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();

        return res.status(200).json({
            message: 'Catways retrieved successfully',
            catways
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send('Internal server error');
    }
}