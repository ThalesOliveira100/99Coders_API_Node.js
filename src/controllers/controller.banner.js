import modelBanner from "../models/model.banner.js";

function GetBanners(req, res){
    modelBanner.GetBanners(req.query.cod_cidade, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}


export default {GetBanners};