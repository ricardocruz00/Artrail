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
        let sql = "select favoritos.id as favoritosID, descricao, DATE_FORMAT(sessaoFotos.timestamp, '%d/%m/%Y, %H:%i') as timestamp, sessao_id, imagem "+
        "FROM favoritos "+ 
        "INNER JOIN user ON user.id = favoritos.user_id "+
        "INNER JOIN sessaoFotos ON sessaoFotos.id = favoritos.sessao_id "+
        "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+ 
        "where favoritos.user_id=? AND favoritos.isFav=1 AND fotografia.id in (select max(fotografia.id) "+
                                 "FROM sessaoFotos "+
                                 "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+
                                 "group by sessaoFotos.id ) ORDER BY favoritos.id DESC";
        let favoritos = await pool.query(sql, [idUser]);
        return { status: 200, data: favoritos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//com erro algures // esta a colocar sessao_id e user_id como null, null
module.exports.addFavorites = async function (favorito) {
    try{
        let sqlFavVerf = "select isFav, sessao_id, user_id from favoritos where sessao_id= ? AND user_id = ?;";
        let favVerf = await pool.query(sqlFavVerf, [favorito.sessao_id, favorito.user_id]);
        console.log(JSON.stringify(favVerf));
        if(favVerf.length == 0) {
            let sql = "insert into favoritos (isFav,sessao_id,user_id) values (1,?,?);";
            let result = await pool.query(sql, [favorito.sessao_id, favorito.user_id]);
            return { status: 200, msg: "Inserted" };
        }
        else if(favVerf.length !== 0 && favVerf.isFav == 1) {
            return { status: 200, msg: "Esta sessão já se encontra na lista de favoritos" };
        }
        else{
            var sqlUpdate = "UPDATE favoritos SET IsFav= 1 WHERE sessao_id= ? AND user_id = ?;";
            let resultUpdate = await pool.query(sqlUpdate, [favorito.sessao_id, favorito.user_id]);
            return { status: 200, msg: "Updated" };}
    } catch (err) {
        console.log(err); 
        return { status: 500, data: err };
    }
 }

module.exports.removeFavorites = async function (favoritoID) {
    try {
            let sql = "UPDATE favoritos SET IsFav= 0 WHERE favoritos.id= ?;";
            let result = await pool.query(sql, favoritoID);
            return { status: 200, data: result };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.newReport = async function (review) {
    try {
            let sqlReportVerf = "SELECT * FROM review WHERE sessaoFotos_id = ? AND user_id = ? AND isReported = 1";
            let reportVerf = await pool.query(sqlReportVerf, [review.sessaoFotos_id, review.user_id]);
                if(reportVerf.length == 0) {
            let sql = "insert into review (isReported, sessaoFotos_id, review.user_id) values (1,?,?)";
            let result = await pool.query(sql, [review.sessaoFotos_id, review.user_id]);
            return { status: 200, data: result };
        }
        else
            return null;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}
