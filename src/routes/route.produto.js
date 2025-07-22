import { Router } from "express";
import controllerProduto from "../controllers/controller.produto.js";
import { verifyJWT } from "../config/token.js";

const routeProduto = Router();

routeProduto.get("/v1/produtos/:id_produto", verifyJWT, controllerProduto.GetProdutoByID);
routeProduto.get("/v1/cardapios/opcoes/:id_produto", verifyJWT, controllerProduto.GetOpcoesByProduto);
routeProduto.get("/v1/cardapios/:id_estabelecimento", verifyJWT, controllerProduto.GetCardapioByEstabelecimento);

export default routeProduto;
