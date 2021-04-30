var pool = require("./DBConn");

module.exports.getAll = async function (idArte) {
    try {
        let sql = "select nome, user.nome_user, descricao, sessaoFotos.id, imagem, sessaoFotos.timestamp, estado_conservacao, nome_artista FROM arte INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id INNER JOIN estadoConservacaoArte ON sessaoFotos.estadoArte_id = estadoConservacaoArte.id INNER JOIN user ON user.id = sessaoFotos.user_id INNER JOIN arte_artista ON arte_artista.arte_id = arte.id INNER JOIN artista ON artista.id = arte_artista.artista_id WHERE arte.id = ?";
        let artes = await pool.query(sql,[idArte]);
        return { status: 200, data: artes };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}