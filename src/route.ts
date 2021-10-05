import express, { Application, Request, Response, NextFunction } from "express";
import { AuthController } from "./controller/Auth.controller";
import { CountryController } from "./controller/Country.controller";
import { checkJwt } from "./middleware/authorization";
import { validate, register, login } from "./middleware/validator";
import rateLimit from "express-rate-limit";
import { app } from "src";
const router = express.Router();

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 secs window time
  max: 10, // limit each token to 10 requests per windowMs
  keyGenerator: function (req /*, res*/) {
    return req.headers["authorization"];
  },
});

/**
 * Auth Routes
 */
router.post("/register", validate(register), AuthController.register);
router.post("/login", validate(login), AuthController.login);

router.get("/countries", limiter, checkJwt, CountryController.getCountries);

export default router;
