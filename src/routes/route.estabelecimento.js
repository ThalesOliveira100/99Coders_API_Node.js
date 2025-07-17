import { Router } from "express";
import controllerEstabelecimento from "../controllers/controller.estabelecimento.js";
import { verifyJWT } from "../config/token.js";

const routeEstabelecimento = Router();

// Destaques
routeEstabelecimento.get("/v1/estabelecimentos/destaques", verifyJWT, controllerEstabelecimento.GetDestaques);

// Favoritos
routeEstabelecimento.get("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.GetFavoritos);
routeEstabelecimento.post("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.SetFavorito);
routeEstabelecimento.delete("/v1/estabelecimentos/favoritos/:id_favorito", verifyJWT, controllerEstabelecimento.DeleteFavorito);

export default routeEstabelecimento;
