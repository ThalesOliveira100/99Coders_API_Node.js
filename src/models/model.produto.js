import {db} from "../config/database.js";

const GetProdutoByID = (id_produto, callback) => {
    let ssql = `
        SELECT p.id_produto, p.id_estabelecimento, p.id_categoria, p.nome, p.descricao, p.url_foto, 
        p.vl_produto, p.vl_promocao, p.ind_ativo 
        FROM  tab_produto p 
        WHERE p.id_produto = ? 
        ORDER BY p.id_produto 
    `;

    db.query(ssql, [id_produto], (err, result) => {
        callback(err, result);
    });
}

const GetCardapioByEstabelecimento = (id_estabelecimento, callback) => {
    let ssql = `
        SELECT p.id_produto, p.id_estabelecimento, p.id_categoria, p.nome, p.descricao, p.url_foto, 
        p.vl_produto, p.vl_promocao, p.ind_ativo, c.categoria 
        FROM tab_produto p 
        JOIN tab_produto_categoria c on (c.id_categoria = p.id_categoria) 
        WHERE c.ind_ativo = 'S' 
        AND p.ind_ativo = 'S' 
        AND p.id_estabelecimento = ? 
        ORDER BY c.ordem, p.nome 
    `;

    db.query(ssql, [id_estabelecimento], (err, result) => {
        callback(err, result);
    });
}

const GetOpcoesByProduto = (id_produto, callback) => {
    let ssql = `
        SELECT o.id_opcao, o.id_produto, o.descricao, o.ind_obrigatorio, o.qtd_max_escolha, o.ind_ativo, 
        o.ordem, i.id_item, i.nome as nome_item, coalesce(i.descricao, '') as descricao_item, 
        coalesce(o.vl_item, 0) as vl_item 
        FROM tab_produto_opcao o 
        JOIN tab_produto_opcao_item i on (i.id_opcao = o.id_opcao) 
        WHERE o.ind_ativo = 'S' 
        AND o.id_produto = ? 
        ORDER BY o.ordem, i.ordem, i.nome 
    `;

    db.query(ssql, [id_produto], (err, result) => {
        callback(err, result);
    });
}


export default {GetProdutoByID, GetCardapioByEstabelecimento, GetOpcoesByProduto};