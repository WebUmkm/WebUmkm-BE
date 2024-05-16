const ModelMenu = require('../model/menu');

const GetAllMenu = async (req, res) => {
    try {
        const result = await ModelMenu.getAllMenu();
        res.status(200).json({
            message: 'Success',
            data: result[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
}

const createMenu = async (req, res) => {
    try {
        const result = await ModelMenu.createMenu(req.body);
        res.status(200).json({
            message: 'Success',
            data: result[0]
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
}

module.exports = {
    GetAllMenu,
    createMenu
}