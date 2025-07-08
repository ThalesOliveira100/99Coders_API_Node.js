import {db} from "../config/database.js";

const GetDestaques = (cod_cidade, callback) => {
    let ssql = `
        SELECT d.descricao, e.id_estabelecimento, e.nome, e.url_logo, e.avaliacao, c.categoria
        FROM tab_destaque d
        JOIN tab_destaque_estabelecimento de on (de.id_destaque = d.id_destaque)
        JOIN tab_estabelecimento e on (e.id_estabelecimento = de.id_estabelecimento)
        JOIN tab_categoria c on (c.id_categoria = e.id_categoria)
        WHERE d.ind_ativo = 'S'
        AND e.cod_cidade = ?
        ORDER BY d.ordem
    `;

    db.query(ssql, [cod_cidade], function(err, result) {
        callback(err, result);
    });
}

export default {GetDestaques}