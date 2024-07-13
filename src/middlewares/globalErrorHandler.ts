import { ErrorRequestHandler } from 'express';
import config from '../config';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode: number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message: string | number = err.message || 'Internal Server Error!';

  return res.status(statusCode).json({
    success: false,
    message,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
