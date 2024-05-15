const exppress = require("express");
const ModelUsers = require("../model/users");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { body } = req;
  try {
    if (!body) {
      return res.status(500).json({
        message: "body tidak ditemukan",
        error: 400,
      });
    }

    const hashPassword = await bcrypt.hash(body.password, 10);
    const role = "user"; // Set the role to "user" automatically

    const user = await ModelUsers.RegisterAccount({
      ...body,
      password: hashPassword,
      role: role, // Assign the role to the user
    });

    res.status(200).json({
      message: "berhasil Register",
      data: user,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      const field = error.sqlMessage.match(/'([^']+)'/)[1];
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists. Please use a different ${field}.`;
      res.status(409).json({
        status: 409,
        message: message,
        field: field,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

const login = async (req, res) => {
    try {
        const body = req;
        const user = await ModelUsers.findOne(email, body.email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                status: 401,
                message: "Authentication failed",
            });
        }
        res.json({
            status: 200,
            message: "Login successful",
            data: {
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
module.exports = {
  register,
  login,
};
