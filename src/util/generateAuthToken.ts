import * as jwt from "jsonwebtoken";

export const generateAuthToken = async function (data: Object) {
  const token = jwt.sign(data, process.env.JWT_KEY);
  return token;
};
