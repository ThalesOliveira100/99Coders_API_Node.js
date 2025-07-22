import modelEstabelecimento from "../models/model.estabelecimento.js";

function GetEstabelecimentos(req, res){
    modelEstabelecimento.GetEstabelecimentos(
        req.id_usuario, 
        req.params.id_estabelecimento, 
        req.query.id_categoria, 
        req.query.nome, 
        req.query.cidade, 
        req.query.id_banner, 
        req.query.pagina,
        (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).json(result[0]);
            }
        }
    );
}

function GetDestaquesByCidade(req, res){
    modelEstabelecimento.GetDestaquesByCidade(req.query.cod_cidade, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}

function GetFavoritosByUser(req, res){
    modelEstabelecimento.GetFavoritosByUser(req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function SetEstabelecimentoFavoritoByUser(req, res) {
    modelEstabelecimento.SetEstabelecimentoFavoritoByUser(req.id_usuario, req.body.id_estabelecimento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({id_favorito: result.insertId});
        }
    });
}

function DeleteEstabelecimentoFavoritoByUser(req, res){
    modelEstabelecimento.DeleteEstabelecimentoFavoritoByUser(req.params.id_favorito, req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_favorito: req.params.id_favorito});
        }
    });
}

export default {GetDestaquesByCidade, GetFavoritosByUser, SetEstabelecimentoFavoritoByUser, DeleteEstabelecimentoFavoritoByUser, GetEstabelecimentos};