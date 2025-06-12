import {db} from "../config/database.js";

const GetCategorias = (cod_cidade, callback) => {
    let ssql = "SELECT c.id_categoria, c.categoria, c.foto, c.ind_ativo, c.ordem ";
    ssql += "FROM tab_categoria c ";
    ssql += "JOIN tab_categoria_cidade cc on (cc.id_categoria = c.id_categoria) ";
    ssql += "WHERE cc.cod_cidade = ? ";

    db.query(ssql, [cod_cidade], function(err, result) {
        callback(err, result);
    });
}

export default {GetCategorias}