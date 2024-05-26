import Users from "../model/UsersModel.js";
import jwt, { decode } from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(403);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if(err) {
            console.log(err); // Tambahkan baris ini untuk menampilkan error di konsol
            return res.sendStatus(403);
        }
        const userId = user[0].id;
        const nickname = user[0].nickname;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, nickname, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        })
        res.json({ accessToken })
    });
  } catch (error) {
    console.log(error);
  }
};
