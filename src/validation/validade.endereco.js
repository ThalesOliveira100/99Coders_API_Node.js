import { db, executeQuery} from "../config/database.js";

const SetEndereco = async (req, res, next) => {
    let erros = [];

    !req.body.endereco && erros.push("Endereço não informado");
    !req.body.bairro && erros.push("Bairro não informado");
    !req.body.cidade && erros.push("Cidade não informada");
    !req.body.uf && erros.push("Estado (UF) não informado");
    !req.body.cep && erros.push("CEP não informado");
    !req.body.cod_cidade && erros.push("Código da cidade não informado");

    if (erros.length > 0) {
        return res.status(400).json({erro : erros.join(", ")});
    } else {
        next();
    }
}

export default {SetEndereco}