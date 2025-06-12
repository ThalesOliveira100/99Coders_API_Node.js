import modelCategoria from "../models/model.categoria.js";

function GetCategorias(req, res){
    modelCategoria.GetCategorias(req.query.cod_cidade, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}


export default {GetCategorias};