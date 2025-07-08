import express from "express";
import cors from "cors";
import routeUsuario from "./routes/route.usuario.js";
import routeCategoria from "./routes/route.categoria.js";
import routeBanner from "./routes/route.banner.js";
import routeCidade from "./routes/route.cidade.js";
import routeCupom from "./routes/route.cupom.js";
import routeEstabelecimento from "./routes/route.estabelecimento.js";

const app = express();

// Middeware JSON
app.use(express.json());

// Middeware CORS
// Permite liberar o acesso da aplicação para usar em outras aplicações
app.use(cors());

// Rotas
app.use(routeUsuario);
app.use(routeCategoria);
app.use(routeBanner);
app.use(routeCidade);
app.use(routeCupom);
app.use(routeEstabelecimento);

app.listen(8082, () => {
    console.log("Servidor iniciado na porta 8082");
})