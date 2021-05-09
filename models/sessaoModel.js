var pool = require("./DBConn");

module.exports.getFotos = async function (idSessao) {
    try {
        let sql = "SELECT imagem FROM fotografia INNER JOIN sessaoFotos ON fotografia.fotografiaInfo_id = sessaoFotos.id WHERE sessaoFotos.id = ?";
        let fotos = await pool.query(sql,[idSessao]);
        return { status: 200, data: fotos };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}