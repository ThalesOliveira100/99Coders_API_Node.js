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

const GetEstabelecimentos = (id_usuario, id_estabelecimento, id_categoria, nome, cod_cidade, id_banner, pagina, callback) => {
    let filtro = [];
    
    let ssql = `
        SELECT e.id_estabelecimento, e.nome, e.url_foto, e.url_logo, coalesce(e.avaliacao, 0) as avaliacao, e.id_categoria, 
        coalesce(e.id_cupom, 0) as id_cupom, e.vl_min_pedido, e.vl_taxa_entrega, e.endereco, coalesce(e.complemento, '') as complemento, 
        e.bairro, e.cidade, e.uf, e.cep, e.cod_cidade, e.ind_ativo, coalesce(f.id_favorito, 0) as id_favorito, 
        coalesce(u.descricao, '') as texto_cupom, c.categoria
        FROM tab_estabelecimento e 
        JOIN tab_categoria c on (c.id_categoria = e.id_categoria) 
        LEFT JOIN tab_usuario_favorito f on (f.id_estabelecimento = e.id_estabelecimento and f.id_usuario = ?) 
        LEFT JOIN tab_cupom u on (u.id_cupom = e.id_cupom and u.ind_ativo = 'S' and u.dt_validade >= current_date() )
    `; 

    if (id_banner > 0) {
        ssql += "JOIN tab_banner_estabelecimento b on (b.id_estabelecimento = e.id_estabelecimento) ";
    }

    ssql += "WHERE e.ind_ativo = 'S'";

    filtro.push(id_usuario);

    if (id_estabelecimento > 0) {
        ssql += "AND e.id_estabelecimento = ? ";
        filtro.push(id_estabelecimento);
    }

    if (id_categoria > 0) {
        ssql += "AND e.id_categoria = ? ";
        filtro.push(id_categoria);
    }

    if (nome?.length > 0) {                 // Interrogação na frente para caso o nome não esteja definido, não der erro ao utilizar o .lenght
        ssql += "AND e.nome like ? ";
        filtro.push(nome);
    }

    if (cod_cidade) {
        ssql += "AND e.cod_cidade = ? ";
        filtro.push(cod_cidade);
    }

    if (id_banner > 0) {
        ssql += "AND b.id_banner = ?";
        filtro.push(id_banner);
    }

    ssql += "order by e.nome "

    if (pagina) {
        ssql += "limit ?, ?";               // offset, qtd_registros
        filtro.push((pagina - 1) * 10);     // pagina a ser exibida
        filtro.push(10);                    // registros por pagina
    }

    db.query(ssql, filtro, function(err, result) {
        callback(err, result);
    });
}

export default {
    GetDestaquesByCidade, 
    GetFavoritosByUser, 
    SetEstabelecimentoFavoritoByUser, 
    DeleteEstabelecimentoFavoritoByUser, 
    GetEstabelecimentos
}