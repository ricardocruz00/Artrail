var pool = require("./DBConn");

module.exports.getAll = async function () {
    try {
        let sql = "select nome, fotografia.id, imagem, arte.id as arteID1, arte.longitude, arte.latitude, nome_artista "+
        "FROM arte "+ 
        "INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id "+
        "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+ 
        "INNER JOIN arte_artista ON arte_artista.arte_id = arte.id "+
        "INNER JOIN artista ON artista.id = arte_artista.artista_id "+
        "where fotografia.id in (select max(fotografia.id) "+
                                 "FROM arte "+
                                 "INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id "+
                                 "INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id "+
                                 "group by arte.id )";
        let artes = await pool.query(sql);
        return { status: 200, data: artes };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

// module.exports.getImagemArte = async function () {
//     try {
//         let sql = "SELECT arte.id, fotografia.imagem, sessaoFotos.timestamp FROM arte INNER JOIN sessaoFotos ON arte.id = sessaoFotos.arte_id INNER JOIN fotografia ON sessaoFotos.id = fotografia.fotografiaInfo_id";
//         let imagens = await pool.query(sql);
//         let imagensLista = [];
//         for(imagem of imagens){

//         }
//         return { status: 200, data: imagens };
//     }catch (err) {
//         console.log(err);
//         return { status: 500, data: err };
//     }
// }
