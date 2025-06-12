import {db} from "../config/database.js";

const GetBanners = (cod_cidade, callback) => {
    let ssql = "SELECT id_banner, descricao, foto, ind_ativo, cod_cidade, ordem ";
    ssql += "FROM tab_banner ";
    ssql += "WHERE cod_cidade = ? ";

    db.query(ssql, [cod_cidade], function(err, result) {
        callback(err, result);
    });
}

export default {GetBanners}