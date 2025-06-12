import {db} from "../config/database.js";

const Validate = (cod_cupom, valor, id_estabelecimento, callback) => {
    let ssql = `
        SELECT c.id_cupom, c.cod_cupom, c.descricao, c.vl_cupom, c.porc_cupom, 
        c.vl_min_pedido, c.dt_validade, c.ind_ativo 
        FROM tab_cupom c 
        JOIN tab_estabelecimento e on (e.id_cupom = c.id_cupom) 
        WHERE c.ind_ativo = 'S' 
        AND c.vl_min_pedido <= ?
        AND c.dt_validade >= current_date() 
        AND c.cod_cupom = ? 
        AND e.id_estabelecimento = ? 
    `;

    db.query(ssql, [valor/100, cod_cupom, id_estabelecimento], function(err, result) {
        callback(err, result);
    });
}

export default {Validate}