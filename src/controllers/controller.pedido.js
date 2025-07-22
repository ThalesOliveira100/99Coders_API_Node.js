import modelPedido from "../models/model.pedido.js";

function GetPedido(req, res){
    modelPedido.GetPedido(req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function AvaliarPedido(req, res){
    modelPedido.AvaliarPedido(req.params.id_pedido, req.body.avaliacao, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_pedido: req.params.id_pedido});
        }
    });
}

function SetPedido(req, res){
    modelPedido.SetPedido(req.id_usuario, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({id_pedido: result.insertId});
        }
    });
}

export default {GetPedido, AvaliarPedido, SetPedido}
