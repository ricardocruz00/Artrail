var pool = require("./DBConn");

module.exports.login = async function (user) {
    try {
        let sql = "select user.id as userID, nome_user from user where username = \"" + user.username + "\" and password = \"" + user.password + "\";";
        let login = await pool.query(sql);
        return { status: 200, data: login };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}


module.exports.newUser = async function (user) {
    try {
        let sqlUsername = "select user.id as userID from user where username = ?;";
        let userID = await pool.query(sqlUsername, user.username);
        if (userID.length == 0) {
            let sql = "insert into user (nome_user, username, email, password) values (?,?,?,?);";
            let result = await pool.query(sql, [ user.nome_user, user.username, user.email, user.password]);
            return { status: 200, data: result };
        }
        else
            return null;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}