// import { ERROR_CODES } from "../constants/constants";

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500 } = res || {};

  switch (statusCode) {
    case 400:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
  }
};

export default errorHandler;
