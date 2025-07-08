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

export default {GetDestaques};