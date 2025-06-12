import { Router } from "express";
import controllerCupom from "../controllers/controller.cupom.js";
import { verifyJWT } from "../config/token.js";

const routeCupom = Router();

routeCupom.get("/v1/cupons/validate", verifyJWT, controllerCupom.Validate);

export default routeCupom;
