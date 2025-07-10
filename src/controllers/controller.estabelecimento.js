import modelEstabelecimento from "../models/model.estabelecimento.js";

function GetDestaques(req, res){
    modelEstabelecimento.GetDestaques(req.query.cod_cidade, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}

function GetFavoritos(req, res){
    modelEstabelecimento.GetFavoritos(req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function SetFavorito(req, res) {
    modelEstabelecimento.SetFavorito(req.id_usuario, req.body.id_estabelecimento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({id_favorito: result.insertId});
        }
    });
}

function DeleteFavorito(req, res){
    modelEstabelecimento.DeleteFavorito(req.params.id_favorito, req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_favorito: req.params.id_favorito});
        }
    });
}

export default {GetDestaques, GetFavoritos, SetFavorito, DeleteFavorito};