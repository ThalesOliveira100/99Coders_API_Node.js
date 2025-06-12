import modelUsuario from "../models/model.usuario.js";
import {createJWT} from "../config/token.js";
import bcrypt from "bcrypt";

const Login = (req, res) => {
    modelUsuario.Login(req.body.email, async (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length == 0) {
            res.status(401).json({erro: "E-mail ou senha inválidos"});
        } else {

            if(await bcrypt.compare(req.body.senha, result[0].senha)) {
                let resultado = result[0];
                resultado["token"] = createJWT(result[0].id_usuario);

                delete resultado.senha;

                res.status(200).json(resultado);
            } else {
                res.status(401).json({erro: "E-mail ou senha inválidos"});
            }

            
        };
    });
}

const Register = (req, res) => {
    modelUsuario.Register(req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let resultado = result;
            resultado["token"] = createJWT(result.id_usuario);

            res.status(201).json(resultado);
        };
    })
}

const GetUserById = (req, res) => {
    if(req.params.id_usuario != req.id_usuario) {
        return res.status(401).json({erro: "Não é permitido obter informações de outro usuário!"})
    }

    modelUsuario.GetUserById(req.params.id_usuario, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        };
    });
}

const EditUserByID = (req, res) => {
    modelUsuario.EditUserByID(req.id_usuario, req.body.nome, req.body.email, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_usuario: req.id_usuario});
        };
    });
}

export default {Login, Register, GetUserById, EditUserByID};