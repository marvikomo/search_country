const { body, query, validationResult } = require("express-validator");
import { ResponseHelper } from "../util/response/response-handler";
const sendResponse = ResponseHelper.sendResponse;

export const validate = (values = []) => {
  return async (req, res, next) => {
    await Promise.all(values.map((value) => value.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    let _errors = errors.array();
    let message = "Invalid parameters:";

    _errors.forEach((v) => {
      message += ` ${v.param},`;
    });

    sendResponse(res, 403, errors.array(), false, message);
  };
};

export const register = [
  body("name").isString().trim(),
  body("email").isEmail().normalizeEmail(),
  body("password").isString().trim(),
];
export const login = [
  body("email").isEmail().normalizeEmail(),
  body("password").isString().trim(),
];

