import { ERROR_CODE_TO_ERROR_TITLE_MAP } from "../constants/constants.js";

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500 } = res || {};

  let errorTitle = ERROR_CODE_TO_ERROR_TITLE_MAP[statusCode];

  if (!errorTitle) {
    console.log("No error found.");
    next();
  } else {
    res.json({
      title: errorTitle,
      message: err.message,
      stackTrace: err.stack,
    });
  }
};

export default errorHandler;
