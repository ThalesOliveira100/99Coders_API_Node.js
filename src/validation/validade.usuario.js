import { db, executeQuery} from "../config/database.js";

const Login = (req, res, next) => {
    let erros = [];

    !req.body.email && erros.push("E-mail não informado");
    !req.body.senha && erros.push("Senha não informada");
    req.body.senha && !(req.body.senha.length >= 6) && erros.push("A senha deve conter pelo menos seis caracteres.")

    if (erros.length > 0) {
        return res.status(400).json({erro : erros.join(", ")});
    } else {
        next();
    }
}

const Register = async (req, res, next) => {
    let erros = [];

    !req.body.nome && erros.push("Nome não informado");
    !req.body.email && erros.push("E-mail não informado");
    !req.body.senha && erros.push("Senha não informada");
    req.body.senha && !(req.body.senha.length >= 6) && erros.push("A senha deve conter pelo menos seis caracteres.");
    !req.body.endereco && erros.push("Endereço não informado");
    !req.body.bairro && erros.push("Bairro não informado");
    !req.body.cidade && erros.push("Cidade não informada");
    !req.body.uf && erros.push("Estado (UF) não informado");
    !req.body.cep && erros.push("CEP não informado");
    !req.body.cod_cidade && erros.push("Código da cidade não informado");

    if (req.body.email) {
        let emailExiste = await executeQuery(db, "SELECT email FROM tab_usuario WHERE email=?", [req.body.email])

        emailExiste.length > 0 && erros.push("Esse e-mail já foi utilizado em outro cadastro.");
    }

    if (erros.length > 0) {
        return res.status(400).json({erro : erros.join(", ")});
    } else {
        next();
    }
}

export default {Login, Register}