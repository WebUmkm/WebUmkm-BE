import Menu from "../model/MenuModel.js";

export const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll({
      attributes: [
        "id_menu",
        "nama_menu",
        "stock_menu",
        "description",
        "img_menu",
      ],
    });
    res.json(menu);
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllMenuMakanan = async (req, res) => {
    const { jenis_menu } = req.params;
    try {
        const menu = await Menu.findAll({
            where: {
                jenis_menu: jenis_menu,
            },
            attributes: [
                "id_menu",
                "nama_menu",
                "stock_menu",
                "description",
                "img_menu",
            ],
        });
        if (!menu || menu.length === 0) {
            return res.status(404).json({
                message: "Menu not found",
                error: 404,
            });
        }
        res.status(200).json(menu);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const createMenu = async (req, res) => {
  const { nama_menu, jenis_menu, stock_menu, description, img_menu } = req.body;
  if (!nama_menu || !jenis_menu || !stock_menu || !description || !img_menu ) {
    return res.status(400).json({ message: "All field must be filled" });
  }
  try {
    await Menu.create({
      nama_menu: nama_menu,
      jenis_menu: jenis_menu,
      stock_menu: stock_menu,
      description: description,
      img_menu: img_menu,
    });
    res.json({
      message: "Menu created",
      data: {
        nama_menu: nama_menu,
        jenis_menu: jenis_menu,
        stock_menu: stock_menu,
        description: description,
        img_menu: img_menu,
      },
    });
  } catch (error) {
    console.log(error);
  }
}