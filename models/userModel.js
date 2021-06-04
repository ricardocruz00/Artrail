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

module.exports.getFavorites = async function (idUser) {
    try {
        let sql = "select descricao, DATE_FORMAT(sessaoFotos.timestamp, '%d/%m/%Y às %H:%i') as timestamp, sessao_id, imagem "+
        "FROM favoritos "+ 
        "INNER JOIN user ON user.id = favoritos.user_id "+
        "INNER JOIN sessaoFotos ON sessaoFotos.id = favoritos.sessao_id "+
        "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+ 
        "where favoritos.user_id=? AND favoritos.isFav=1 AND fotografia.id in (select max(fotografia.id) "+
                                 "FROM sessaoFotos "+
                                 "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+
                                 "group by sessaoFotos.id ) ";
        let favoritos = await pool.query(sql, [idUser]);
        return { status: 200, data: favoritos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.addFavorites = async function (favorito) {
    try{
        let sqlFavVerf = "select favoritos.sessao_id, favoritos.user_id from favoritos where favoritos.sessao_id=? AND favoritos.user_id = ?;";
        let favVerf = await pool.query(sqlFavVerf, favorito.sessao_id, favorito.user_id);
        if(favVerf.length ==0) {
            let sql = "insert into favoritos (isFav,sessao_id,user_id) values (?,?,?);";
            let result = await pool.query(sql, [ favorito.isFav, favorito.sessao_id, favorito.user_id]);
            return { status: 200, data: result };
        }
        else
            return null;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}