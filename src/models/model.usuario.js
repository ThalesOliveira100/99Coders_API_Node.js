import {db} from "../config/database.js";
import bcrypt from "bcrypt";

const Login = (email, callback) => {
    let ssql = "SELECT u.id_usuario, u.nome, u.email, u.dt_cadastro, u.senha, ";
    ssql += "e.endereco, e.complemento, e.bairro, e.cidade, e.uf, e.cep, e.cod_cidade ";
    ssql += "FROM tab_usuario u ";
    ssql += "LEFT JOIN tab_usuario_endereco e ON (e.id_usuario = u.id_usuario AND e.ind_padrao = 'S' ) ";
    ssql += "WHERE u.email=? ";

    db.query(ssql, [email], function(err, result) {
        callback(err, result);
    });
}

const Register = (dadosUsuario, callback) => {
    db.getConnection((err, conn) => {

        conn.beginTransaction(async (err) => {

            let ssql = "insert into tab_usuario(nome, email, senha, dt_cadastro) ";
            ssql += "values(?, ?, ?, current_timestamp()) ";

            const criptSenha = await bcrypt.hash(dadosUsuario.senha, 10);

            conn.query(ssql, [dadosUsuario.nome, dadosUsuario.email, criptSenha], (err, result) => {
                
                if(err) {
                    conn.rollback();
                    callback(err, result);
                } else {

                    const id_usuario = result.insertId; // Devolve o id que foi inserido no campo autoincremento.

                    ssql = "insert into tab_usuario_endereco(id_usuario, endereco, complemento,";
                    ssql += "bairro, cidade, uf, cep, ind_padrao, cod_cidade) ";
                    ssql += "values(?, ?, ?, ?, ?, ?, ?, 'S', ?)";

                    conn.query(ssql, [
                        id_usuario, 
                        dadosUsuario.endereco, 
                        dadosUsuario.complemento, 
                        dadosUsuario.bairro,
                        dadosUsuario.cidade,
                        dadosUsuario.uf,
                        dadosUsuario.cep,,
                        dadosUsuario.ind_padrao,
                        dadosUsuario.cod_cidade

                    ], (err, result) => {
                        if(err){
                            conn.rollback();
                            callback(err, result)
                        } else {
                            conn.commit();
                        callback(err, {id_usuario}); // {"id_usuario": 123}
                        }

                        conn.release();
                    })
                }
            })
        });
    });
}

const GetUserById = (id_usuario, callback) => {
    let ssql = "select id_usuario, nome, email, dt_cadastro from tab_usuario where id_usuario = ?";

    db.query(ssql, [id_usuario], function(err, result){
        callback(err, result);
    });
}

const EditUserByID = (id_usuario, nome, email, callback) => {
    let ssql = "update tab_usuario set nome=?, email=? where id_usuario=? ";

    db.query(ssql, [nome, email, id_usuario], function(err, result){
        callback(err, result);
    });
}

const GetEnderecos = (id_usuario, id_endereco, cod_cidade, callback) => {
    let filtro = [];

    let ssql = `
        SELECT id_endereco, id_usuario, endereco, complemento, bairro, cidade, uf, cep, coalesce(ind_padrao, 'N'), cod_cidade 
        FROM tab_usuario_endereco 
        WHERE id_usuario = ? 
    `;

    // Coalesce é uma função que verifica se o campo está NULL, e se estiver, passa um valor padrão.

    filtro.push(id_usuario);

    if(id_endereco) {
        ssql += "and id_endereco = ? "
        filtro.push(id_endereco);
    }

    if(cod_cidade) {
        ssql += "and cod_cidade = ? "
        filtro.push(cod_cidade);
    }

    ssql += "order by id_endereco desc ";

    db.query(ssql, filtro, function(err, result){
        callback(err, result);
    });
}

const SetEndereco = (id_usuario, dadosEnd, callback) => {
    let ssql = `
        INSERT INTO tab_usuario_endereco(id_usuario, endereco, complemento, bairro, cidade, uf, cep, ind_padrao, cod_cidade) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        ssql, 
        [
            id_usuario, 
            dadosEnd.endereco, 
            dadosEnd.complemento, 
            dadosEnd.bairro, 
            dadosEnd.cidade, 
            dadosEnd.uf, 
            dadosEnd.cep, 
            dadosEnd.ind_padrao, 
            dadosEnd.cod_cidade
        ], 
        function(err, result){
            callback(err, result);
    });
}

const AlterEndereco = (id_usuario, id_endereco, dadosEnd, callback) => {
    let ssql = `
        UPDATE tab_usuario_endereco SET endereco=?, complemento=?, bairro=?, cidade=?, uf=?, cep=?, cod_cidade=?, 
        WHERE id_endereco=? AND id_usuario=? 
    `;

    db.query(
        ssql, 
        [
            id_usuario,
            id_endereco,
            dadosEnd.endereco, 
            dadosEnd.complemento, 
            dadosEnd.bairro, 
            dadosEnd.cidade, 
            dadosEnd.uf, 
            dadosEnd.cep, 
            dadosEnd.cod_cidade,
            id_endereco,
            id_usuario
        ], 
        function(err, result){
            callback(err, result);
    });
}

const DeleteEndereco = (id_endereco, id_usuario, callback) => {
    let ssql = `
        DELETE FROM tab_usuario_endereco 
        WHERE id_endereco=? AND id_usuario=? 
    `;

    db.query(
        ssql, [id_endereco, id_usuario], function(err, result){
            callback(err, result);
    });
}

const EnderecoPadrao = (id_endereco, id_usuario, callback) => {
    db.getConnection((err, conn) => {

        conn.beginTransaction(async (err) => {

            let ssql = `
                UPDATE tab_usuario_endereco 
                SET ind_padrao = 'N' 
                WHERE id_usuario=? 
            `;
            
            ssql += "values(?, ?, ?, current_timestamp()) ";

            conn.query(ssql, [id_usuario], (err, result) => {
                
                if(err) {
                    conn.rollback();
                    callback(err, result);
                } else {

                    ssql = `
                        UPDATE tab_usuario_endereco 
                        SET ind_padrao = 'S' 
                        WHERE id_endereco=? AND id_usuario=? 
                    `;

                    conn.query(ssql, [id_endereco, id_usuario], (err, result) => {

                        if(err){
                            conn.rollback();
                            callback(err, result)
                        } else {
                            conn.commit();
                            callback(err, {id_usuario}); // {"id_usuario": 123}
                        }

                        conn.release();
                    });
                }
            });
        });
    });
}

export default {Login, Register, GetUserById, EditUserByID, GetEnderecos, SetEndereco, AlterEndereco, DeleteEndereco, EnderecoPadrao};