import { Router } from "express";
import controllerBanner from "../controllers/controller.banner.js";
import {verifyJWT} from "../config/token.js";

const routeBanner = Router();

routeBanner.get("/v1/banners", verifyJWT, controllerBanner.GetBanners);

export default routeBanner;
