import modelPedido from "../models/model.pedido.js";

function GetPedido(req, res){
    modelPedido.GetPedido(req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}

export default {GetPedido}
