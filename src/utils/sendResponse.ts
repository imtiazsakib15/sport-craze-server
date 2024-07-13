import { Response } from 'express';

interface TData {
  statusCode: number;
  success: boolean;
  message: string;
  data: object;
}

export const sendResponse = (
  res: Response,
  { statusCode, success, message, data }: TData,
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
