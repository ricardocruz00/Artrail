var pool = require("./DBConn");

module.exports.getSessoes = async function (idArte) {
    try {
        let sql = "select nome, user.nome_user, descricao, sessaoFotos.id as sessaoID1, imagem, DATE_FORMAT(sessaoFotos.timestamp, '%d/%m/%Y, %H:%i') as timestamp, estado_conservacao, nome_artista "+ 
        "FROM arte INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id "+ 
        "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+ 
        "INNER JOIN estadoConservacaoArte ON sessaoFotos.estadoArte_id = estadoConservacaoArte.id "+ 
        "INNER JOIN user ON user.id = sessaoFotos.user_id "+ 
        "INNER JOIN arte_artista ON arte_artista.arte_id = arte.id "+ 
        "INNER JOIN artista ON artista.id = arte_artista.artista_id WHERE arte.id = ? AND "+
            "fotografia.id in (select max(fotografia.id) "+
            "FROM sessaoFotos "+
            "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+
            "group by sessaoFotos.id )";
        let sessoes = await pool.query(sql,[idArte]);
        return { status: 200, data: sessoes };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAllCategorias = async function () {
    try {
        let sql = "SELECT id as categoriaID, categoria_nome FROM categoria ORDER BY categoria_nome";
        let categorias = await pool.query(sql);
        return { status: 200, data: categorias };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getCategoriasArte = async function (idArte) {
    try {
        let sql = "SELECT categoria_nome FROM categoria INNER JOIN arte_categoria ON categoria.id = arte_categoria.categoria_id INNER JOIN arte ON arte.id = arte_categoria.arte_id WHERE arte.id = ?";
        let categorias = await pool.query(sql,[idArte]);
        return { status: 200, data: categorias };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getAllEstados = async function () {
    try {
        let sql = "SELECT estadoConservacaoArte.id as estadoConservacaoArteID, estado_conservacao FROM estadoConservacaoArte";
        let estados = await pool.query(sql);
        return { status: 200, data: estados };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getOne = async function(idSessao) {
    try {
        let sqlInfo = "SELECT nome_artista, nome, descricao, DATE_FORMAT(sessaoFotos.timestamp, '%d/%m/%Y, %H:%i') as timestamp, estado_conservacao, nome_user, user.id as userID FROM sessaoFotos INNER JOIN user ON sessaoFotos.user_id = user.id INNER JOIN estadoConservacaoArte ON sessaoFotos.estadoArte_id = estadoConservacaoArte.id INNER JOIN arte ON arte.id = sessaoFotos.arte_id INNER JOIN arte_artista ON arte.id = arte_artista.arte_id INNER JOIN artista ON artista.id = arte_artista.artista_id WHERE sessaoFotos.id = ?";
        let sessoes = await pool.query(sqlInfo,[idSessao]);
        let sqlReview = "SELECT COUNT(review.id) as nReports FROM review WHERE sessaoFotos_id = ? AND isReported = 1";
        let reports = await pool.query(sqlReview,[idSessao]);
        //só da para um artista
        let sqlImage = "SELECT imagem, fotografia.id as fotografiaID FROM fotografia INNER JOIN sessaoFotos ON fotografia.fotografiaInfo_id = sessaoFotos.id WHERE sessaoFotos.id = ?"
        let fotos = await pool.query(sqlImage,[idSessao]); 
        let sessao = {sessaoInfo: sessoes[0],fotos: fotos, reports: reports[0] } ;
        
        return {status:200, data: sessao};
    } catch(err) {
        console.log(err);
        return {status:500, data: err};
    }
}

// module.exports.getSessoesFiltradas = async function (estadoSessao) {
//     try {
//         let sql = "select nome, user.nome_user, descricao, sessaoFotos.id as sessaoID1, imagem, DATE_FORMAT(sessaoFotos.timestamp, '%d/%m/%Y às %H:%i') as timestamp, estado_conservacao, nome_artista "+ 
//         "FROM arte INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id "+ 
//         "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+ 
//         "INNER JOIN estadoConservacaoArte ON sessaoFotos.estadoArte_id = estadoConservacaoArte.id "+ 
//         "INNER JOIN user ON user.id = sessaoFotos.user_id "+ 
//         "INNER JOIN arte_artista ON arte_artista.arte_id = arte.id "+ 
//         "INNER JOIN artista ON artista.id = arte_artista.artista_id WHERE arte.id = ? AND estadoConservacaoArte.id = ? AND "+
//             "fotografia.id in (select max(fotografia.id) "+
//             "FROM sessaoFotos "+
//             "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+
//             "group by sessaoFotos.id )";
//         let sessoes = await pool.query(sql,[estadoSessao.arteID, estadoSessao.estadoConservacaoArteID]);
//         return { status: 200, data: sessoes };
//     } catch (err) {
//         console.log(err);
//         return { status: 500, data: err };
//     }
// }
