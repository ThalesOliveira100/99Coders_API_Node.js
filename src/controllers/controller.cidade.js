import modelCidade from "../models/model.cidade.js";

function GetCidades(req, res){
    modelCidade.GetCidades((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}


export default {GetCidades};