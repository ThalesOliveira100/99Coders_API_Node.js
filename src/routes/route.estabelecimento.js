import { Router } from "express";
import controllerEstabelecimento from "../controllers/controller.estabelecimento.js";
import { verifyJWT } from "../config/token.js";

const routeEstabelecimento = Router();

routeEstabelecimento.get("/v1/estabelecimentos/destaques", verifyJWT, controllerEstabelecimento.GetDestaques);

export default routeEstabelecimento;
