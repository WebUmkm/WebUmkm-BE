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
    const {body} = req;
    try {
        const result = await ModelMenu.createMenu(body);
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
const getByNameMenu = async (req, res) => {
    const { name } = req.params;
    try {
        const nama_menu = await ModelMenu.getMenuByName(name);
        if (!nama_menu) {
            return res.status(404).json({
                message: "Menu not found",
                error: 404
            });
        }
        res.status(200).json(nama_menu);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

const updateStockMenu = async (req, res) => {
    const {id} = req.params;
    const {body} = req.body;
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    GetAllMenu,
    createMenu,
    getByNameMenu
}