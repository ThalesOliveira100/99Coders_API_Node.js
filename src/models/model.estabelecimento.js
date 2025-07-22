import {db} from "../config/database.js";

const GetDestaquesByCidade = (cod_cidade, callback) => {
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

const GetFavoritosByUser = (id_usuario, callback) => {
    let ssql = `
        SELECT f.id_favorito, e.id_estabelecimento, e.nome, e.url_logo, e.avaliacao, c.categoria, e.endereco, e.complemento, e.cidade, e.cod_cidade
        FROM tab_usuario_favorito f
        JOIN tab_estabelecimento e on (f.id_estabelecimento = e.id_estabelecimento)
        JOIN tab_categoria c on (c.id_categoria = e.id_categoria)
        WHERE f.id_usuario = ?
        ORDER BY e.nome
    `;

    db.query(ssql, [id_usuario], function(err, result) {
        callback(err, result);
    });
}

const SetEstabelecimentoFavoritoByUser = (id_usuario, id_estabelecimento, callback) => {
    let ssql = `
        INSERT INTO tab_usuario_favorito(id_usuario, id_estabelecimento) values(?, ?) 
    `;

    db.query(ssql, [id_usuario, id_estabelecimento], function(err, result) {
        callback(err, result);
    });
}

const DeleteEstabelecimentoFavoritoByUser = (id_favorito, id_usuario, callback) => {
    let ssql = `
        DELETE FROM tab_usuario_favorito
        WHERE id_favorito = ?
        AND id_usuario = ?
    `;

    db.query(ssql, [id_favorito, id_usuario], function(err, result) {
        callback(err, result);
    });
}


export default {GetDestaquesByCidade, GetFavoritosByUser, SetEstabelecimentoFavoritoByUser, DeleteEstabelecimentoFavoritoByUser}