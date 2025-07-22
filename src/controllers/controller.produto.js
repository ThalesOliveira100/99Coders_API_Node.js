import modelProduto from "../models/model.produto.js";

function GetProdutoByID(req, res){
    modelProduto.GetProdutoByID(req.params.id_produto, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}

function GetCardapioByEstabelecimento(req, res){
    modelProduto.GetCardapioByEstabelecimento(req.params.id_estabelecimento, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function GetOpcoesByProduto(req, res){
    modelProduto.GetOpcoesByProduto(req.params.id_produto, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

export default {GetProdutoByID, GetCardapioByEstabelecimento, GetOpcoesByProduto};