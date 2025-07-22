import { Router } from "express";
import controllerPedido from "../controllers/controller.pedido.js";
import { verifyJWT } from "../config/token.js";

const routePedido = Router();

routePedido.post("/v1/pedidos", verifyJWT, controllerPedido.SetPedido);
routePedido.get("/v1/pedidos", verifyJWT, controllerPedido.GetPedido);
routePedido.put("/v1/pedidos/avaliacao/:id_pedido", verifyJWT, controllerPedido.AvaliarPedido)

export default routePedido;
