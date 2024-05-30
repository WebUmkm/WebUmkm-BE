import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "nickname", "email"],
    });
    res.json(users);
  } catch (error) {
    console.error(error.message);
  }
};

export const getUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await Users.findAll({
      where: {
        id: id,
      },
      attributes: ["fullname"],
    });
    if(!user){
      res.status(404).json({message: "User not found"})
    };
    res.json(user);
  } catch (error) {
    console.log(error);
  }
}

export const Register = async (req, res) => {
  const { fullname, nickname, email, phoneNumber, password, confirmPassword } =
    req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password not match" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const role = "user";
  try {
    await Users.create({
      fullname: fullname,
      nickname: nickname,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      role: role,
    });
    res.json({ message: "User created" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const user = await Users.findAll({
    where: {
      email: req.body.email,
    },
  });
  const match = await bcrypt.compare(req.body.password, user[0].password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });
  const userId = user[0].id;
  const fullname = user[0].fullname;
  const nickname = user[0].nickname;
  const email = user[0].email;
  const phoneNumber = user[0].phoneNumber;
  const role = user[0].role;
  const accessToken = jwt.sign(
    { userId, fullname, nickname, email, phoneNumber, role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "60s",
    }
  );
  const refreshToken = jwt.sign(
    { userId,fullname, nickname, email, phoneNumber, role},
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "2d",
    }
  );
  await Users.update(
    { refreshToken: refreshToken },
    {
      where: {
        id: userId,
      },
    }
  );
  res.cookie("refershToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

export const Logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.sendStatus(203);
  const user = await Users.findAll({
    where: {
      access_token: accessToken,
    },
  });
  if (!user[0]) return res.sendStatus(403);
  const userId = user[0].id;
  await Users.update(
    { access_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Logged out successfully" });
};
