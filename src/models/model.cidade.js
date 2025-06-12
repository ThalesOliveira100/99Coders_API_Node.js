import {db} from "../config/database.js";

const GetCidades = (callback) => {
    let ssql = "SELECT cod_cidade, cidade, uf ";
    ssql += "FROM tab_cidade ";
    ssql += "ORDER BY cidade ";

    db.query(ssql, [], function(err, result) {
        callback(err, result);
    });
}

export default {GetCidades}