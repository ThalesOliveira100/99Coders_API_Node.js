import { Router } from "express";
import controllerUsuario from "../controllers/controller.usuario.js";
import {verifyJWT} from "../config/token.js";
import validadeUsuario from "../validation/validade.usuario.js"
import validadeEndereco from "../validation/validade.endereco.js";

const routeUsuario = Router();

// Endereços
routeUsuario.post("/v1/usuarios/enderecos", [verifyJWT, validadeEndereco.SetEndereco], controllerUsuario.SetEndereco);
routeUsuario.get("/v1/usuarios/enderecos", verifyJWT, controllerUsuario.GetEnderecos);
routeUsuario.get("/v1/usuarios/enderecos/:id_endereco", verifyJWT, controllerUsuario.GetEnderecos);
routeUsuario.put("/v1/usuarios/enderecos/:id_endereco", verifyJWT, controllerUsuario.AlterEndereco);
routeUsuario.put("/v1/usuarios/enderecos/padrao/:id_endereco", verifyJWT, controllerUsuario.EnderecoPadrao)
routeUsuario.delete("/v1/usuarios/enderecos/:id_endereco", verifyJWT, controllerUsuario.DeleteEndereco);

// Usuarios
routeUsuario.post("/v1/usuarios/login", validadeUsuario.Login, controllerUsuario.Login);
routeUsuario.post("/v1/usuarios/register", validadeUsuario.Register, controllerUsuario.Register);
routeUsuario.get("/v1/usuarios/:id_usuario", verifyJWT, controllerUsuario.GetUserById);
routeUsuario.patch("/v1/usuarios", verifyJWT, controllerUsuario.EditUserByID);


export default routeUsuario;
