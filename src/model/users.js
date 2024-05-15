const dbPool = require('../config/database');

const RegisterAccount = (body) => {
    const SQLQuery = 'INSERT INTO users (fullname, nickname, email, phoneNumber, password, role) VALUES (?,?,?,?,?,?)';
    const values = [body.fullname, body.nickname, body.email, body.phoneNumber, body.password, body.role];
    return dbPool.execute(SQLQuery, values);
}
const LoginAccount = (body) => {
    const SQLQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [body.email, body.password];
    return dbPoll.execute(SQLQuery, values);
}

module.exports = {
    RegisterAccount,
    LoginAccount
}