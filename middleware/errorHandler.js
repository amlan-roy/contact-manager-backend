import {
  ERROR_CODE_TO_ERROR_TITLE_MAP,
  ERROR_TITLES,
} from "../constants/constants.js";

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500 } = res || {};

  let errorTitle = ERROR_CODE_TO_ERROR_TITLE_MAP[statusCode];

  if (!errorTitle) {
    res.status(500);
    const env = process.env.NODE_ENV || "development";
    const stackTrace =
      env === "development"
        ? {
            message: err.message,
            stackTrace: err.stack,
          }
        : {};
    res.json({
      title: ERROR_TITLES.DEFAULT,
      ...stackTrace,
    });
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
