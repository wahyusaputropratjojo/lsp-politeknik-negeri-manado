import { allowedOrigins } from "../configs/corsOptions.js";

export const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", true);
  }
  next();
};
