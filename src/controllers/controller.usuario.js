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

const GetEnderecos = (req, res) => {

    modelUsuario.GetEnderecos(req.id_usuario, req.params.id_endereco, req.query.cod_cidade, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        };
    });
}

const SetEndereco = (req, res) => {
    modelUsuario.SetEndereco(req.id_usuario, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({id_endereco: result.insertId});
        };
    })
}

const AlterEndereco = (req, res) => {
    modelUsuario.AlterEndereco(req.id_usuario, req.params.id_endereco, req.body, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_endereco: req.params.id_endereco});
        };
    })
}

const DeleteEndereco = (req, res) => {
    modelUsuario.DeleteEndereco(req.params.id_endereco, req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_endereco: req.params.id_endereco});
        };
    })
}

const EnderecoPadrao = (req, res) => {
    modelUsuario.EnderecoPadrao(req.params.id_endereco, req.id_usuario, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({id_endereco: req.params.id_endereco});
        };
    })
}

export default {
    Login, 
    Register, 
    GetUserById, 
    EditUserByID, 
    GetEnderecos, 
    SetEndereco, 
    AlterEndereco, 
    DeleteEndereco, 
    EnderecoPadrao
};