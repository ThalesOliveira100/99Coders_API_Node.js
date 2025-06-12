import mysql from "mysql";

// Conexão com o banco...
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "12345",
    database: "delivery_mais__99node",
})

db.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao se conectar com banco de dados: " + err.sqlMessage);
    } else {
        console.log("Conexão com banco de dados realizada com sucesso.");
    }
});

export {db};