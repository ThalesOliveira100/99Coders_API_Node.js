import {db, executeQuery} from "../config/database.js";

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

                // Pedido
                let pedido = await executeQuery(conn, ssql, [id_usuario, jsonPed.id_estabelecimento, jsonPed.id_cupom, jsonPed.vl_taxa_entrega, 
                    jsonPed.vl_desconto, jsonPed.vl_total, jsonPed.status, jsonPed.avaliacao, jsonPed.endereco, 
                    jsonPed.complemento, jsonPed.bairro, jsonPed.cidade, jsonPed.uf, jsonPed.cep, jsonPed.cod_cidade]);

                let id_pedido = pedido.insertId;
                
                // Itens
                for (let i = 0; i < jsonPed.itens.length; i++) {
                    let item = jsonPed.itens[i];
                    
                    ssql = `
                        INSERT INTO tab_pedido_item(id_pedido, id_produto, descricao, qtd, vl_unit, vl_total) 
                        VALUES(?, ?, ?, ?, ?, ?) 
                    `;

                    let retorno = await executeQuery(conn, ssql, [id_pedido, item.id_produto, item.descricao, item.qtd, item.vl_unit, item.vl_total])

                    let id_pedido_item = retorno.insertId;

                    // Detalhes
                    for (let x = 0; x < item.detalhes.length; x++) {
                        let detalhe = item.detalhes[x];

                        ssql = `
                            INSERT INTO tab_pedido_item_detalhe(id_pedido_item, nome, id_item, vl_item, ordem) 
                            VALUES (?, ?, ?, ?, ?) 
                        `

                        await executeQuery(conn, ssql, [id_pedido_item, detalhe.nome, detalhe.id_item, detalhe.vl_item, detalhe.ordem])
                    }
                }

                conn.commit();
                callback(undefined, pedido)

            } catch (error) {
                conn.rollback();
                callback(error, {})
            }

            conn.release();
        });
    });
}


export default {GetPedido, AvaliarPedido, SetPedido}
