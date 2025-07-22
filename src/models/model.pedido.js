import {db} from "../config/database.js";

const GetPedido = (id_usuario, callback) => {
    let ssql = `
        SELECT p.id_pedido, p.id_estabelecimento, e.nome, count(*) as qtd_item, p.vl_total, p.dt_pedido, e.url_logo, 
        coalesce(p.avaliacao, 0) as avaliacao, p.status 
        FROM tab_pedido p 
        JOIN tab_estabelecimento e on (p.id_estabelecimento = e.id_estabelecimento) 
        LEFT JOIN tab_pedido_item i on (p.id_pedido = i.id_pedido) 
        WHERE p.id_usuario = ? 
        GROUP BY p.id_pedido, p.id_estabelecimento, e.nome, p.vl_total, p.dt_pedido, e.url_logo, p.avaliacao, p.status 
        ORDER BY p.id_pedido desc 
    `;

    db.query(ssql, [id_usuario], function(err, result) {
        callback(err, result);
    });
}

const AvaliarPedido = (id_pedido, avaliacao, callback) => {
    let ssql = `
        UPDATE tab_pedido
        SET avaliacao = ? 
        WHERE id_pedido = ?
    `;

    db.query(ssql, [avaliacao, id_pedido], function(err, result) {
        callback(err, result);
    });
}

const SetPedido = (id_usuario, jsonPed, callback) => {
    db.getConnection((err, conn) => {

        conn.beginTransaction(async (err) => {

            try {
                let ssql = `
                    INSERT INTO tab_pedido(id_usuario, id_estabelecimento, id_cupom, vl_taxa_entrega, vl_desconto, 
                    vl_total, dt_pedido, status, avaliacao, endereco, complemento, bairro, cidade, uf, cep, cod_cidade) 
                    VALUES(?, ?, ?, ?, ?, ?, current_timestamp(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                conn.query(ssql, [id_usuario, jsonPed.id_estabelecimento, jsonPed.id_cupom, jsonPed.vl_taxa_entrega, jsonPed.vl_desconto, 
                jsonPed.vl_total, jsonPed.status, jsonPed.avaliacao, jsonPed.endereco, jsonPed.complemento, jsonPed.bairro, 
                jsonPed.cidade, jsonPed.uf, jsonPed.cep, jsonPed.cod_cidade], (err, result) => {

                    // 12:12 -> criar novo método para fazer as operações de forma assincrona.

                    if(err) {
                        conn.rollback();
                        callback(err, result);
                    } else {

                        const id_usuario = result.insertId; // Devolve o id que foi inserido no campo autoincremento.

                        ssql = "insert into tab_usuario_endereco(id_usuario, endereco, complemento,";
                        ssql += "bairro, cidade, uf, cep, ind_padrao, cod_cidade) ";
                        ssql += "values(?, ?, ?, ?, ?, ?, ?, 'S', ?)";

                        conn.query(ssql, [
                            id_usuario, 
                            dadosUsuario.endereco, 
                            dadosUsuario.complemento, 
                            dadosUsuario.bairro,
                            dadosUsuario.cidade,
                            dadosUsuario.uf,
                            dadosUsuario.cep,,
                            dadosUsuario.ind_padrao,
                            dadosUsuario.cod_cidade

                        ], (err, result) => {
                            if(err){
                                conn.rollback();
                                callback(err, result)
                            } else {
                                conn.commit();
                            callback(err, {id_usuario}); // {"id_usuario": 123}
                            }

                            conn.release();
                        });
                        }
                    });

            } catch (error) {
                
            }

            
        });
    });
}


export default {GetPedido, AvaliarPedido, SetPedido}
