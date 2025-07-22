import { Router } from "express";
import controllerEstabelecimento from "../controllers/controller.estabelecimento.js";
import { verifyJWT } from "../config/token.js";

const routeEstabelecimento = Router();

// Destaques
routeEstabelecimento.get("/v1/estabelecimentos/destaques", verifyJWT, controllerEstabelecimento.GetDestaquesByCidade);

// Favoritos
routeEstabelecimento.get("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.GetFavoritosByUser);
routeEstabelecimento.post("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.SetEstabelecimentoFavoritoByUser);
routeEstabelecimento.delete("/v1/estabelecimentos/favoritos/:id_favorito", verifyJWT, controllerEstabelecimento.DeleteEstabelecimentoFavoritoByUser);

// Estabelecimentos
routeEstabelecimento.get("/v1/estabelecimentos/:id_estabelecimento", verifyJWT, controllerEstabelecimento.GetEstabelecimentos)
routeEstabelecimento.get("/v1/estabelecimentos", verifyJWT, controllerEstabelecimento.GetEstabelecimentos);


export default routeEstabelecimento;
