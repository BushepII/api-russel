const mongoose = require('mongoose');
const catwayService = require('../../services/catwayService');

exports.addCatway = async (req, res) => {
    try {
        const { catwayNumber, type, catwayState } = req.body ?? {};

        if (
            !Number.isInteger(catwayNumber) || catwayNumber < 1 ||
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

exports.getCatway = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway ID'
            });
        }

        const catway = await catwayService.getCatway(id);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway not found'
            });
        }

        return res.status(200).json({
            message: 'Catway retrieved successfully',
            catway
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send('Internal server error');
    }
}

exports.updateCatway = async (req, res) => {
    try {
        const { id } = req.params;
        const { catwayNumber, type, catwayState } = req.body ?? {};

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway ID'
            });
        }
        
        const data = {}

        if (catwayNumber !== undefined) {
            data.catwayNumber = catwayNumber;
        }

        if (type !== undefined) {
            data.type = type.trim().toLowerCase();
        }

        if (catwayState !== undefined) {
            data.catwayState = catwayState.trim();
        }

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                message: 'No valid fields to update'
            });
        }

        const catway = await catwayService.updateCatway(id, data);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway not found'
            });
        }

        return res.status(200).json({
            message: 'Catway updated successfully'
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Catway number already exists'
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.replaceCatway = async (req, res) => {
    try {
        const { id } = req.params;
        const { catwayNumber, type, catwayState } = req.body ?? {};

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway ID'
            });
        }

        if (
            !Number.isInteger(catwayNumber) || catwayNumber < 1 ||
            typeof type !== "string" ||
            typeof catwayState !== "string" || !catwayState.trim()
        ) {
            return res.status(400).send('Invalid catway data');
        }

        const normalizedType = type.trim().toLocaleLowerCase();

        if (normalizedType !== "short" && normalizedType !== 'long') {
            return res.status(400).json({
                message: 'Type must be short or long'
            });
        }

        const data = {
            catwayNumber: catwayNumber,
            type: normalizedType,
            catwayState: catwayState.trim()
        }

        const catway = await catwayService.replaceCatway(id, data);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway not found'
            });
        }

        return res.status(200).json({
            message: 'Catway replaced successfully'
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Catway number already exists'
            });
        }

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

exports.deleteCatway = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                message: 'Invalid catway ID'
            });
        }

        const catway = await catwayService.deleteCatway(id);

        if (!catway) {
            return res.status(404).json({
                message: 'Catway not found'
            });
        }

        return res.status(200).json({
            message: 'Catway deleted successfully'
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}