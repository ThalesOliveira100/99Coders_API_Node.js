import { Router } from "express";
import controllerUsuario from "../controllers/controller.usuario.js";
import {verifyJWT} from "../config/token.js";

const routeUsuario = Router();

routeUsuario.post("/v1/usuarios/login", controllerUsuario.Login);
routeUsuario.post("/v1/usuarios/register", controllerUsuario.Register);
routeUsuario.get("/v1/usuarios/:id_usuario", verifyJWT, controllerUsuario.GetUserById);
routeUsuario.patch("/v1/usuarios", verifyJWT, controllerUsuario.EditUserByID);

export default routeUsuario;
