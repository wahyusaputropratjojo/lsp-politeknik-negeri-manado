export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case 400:
      res.json({
        code: 400,
        status: "Bad Request",
        message: error.message,
      });
      break;
    case 401:
      res.json({
        code: 401,
        status: "Unauthorized",
        message: error.message,
      });
      break;
    case 403:
      res.json({
        code: 403,
        status: "Forbidden",
        message: error.message,
      });
      break;
    case 404:
      res.json({
        code: 404,
        status: "Not Found",
        message: error.message,
      });
      break;
    case 500:
      res.json({
        code: 500,
        status: "Internal Server Error",
        message: error.message,
      });
      break;
    case 501:
      res.json({
        code: 501,
        status: "Not Implemented",
        message: error.message,
      });
      break;
    case 502:
      res.json({
        code: 502,
        status: "Bad Gateway",
        message: error.message,
      });
      break;
    case 503:
      res.json({
        code: 503,
        status: "Service Unavailable",
        message: error.message,
      });
      break;
    case 504:
      res.json({
        code: 504,
        status: "Gateway Timeout",
        message: error.message,
      });
      break;
  }
};
