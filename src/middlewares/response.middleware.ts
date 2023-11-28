import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      sendResponse(data: Object): Response;
      sendError(
        status: number,
        error: Object | Object[] | any,
        message: string
      ): Response;
    }
  }
}
// Custom response middleware
export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.sendResponse = (data: Object) => {
    const resData: OResponse = {
      success: true,
      data: data,
      message: "Success",
    };
    return res.status(200).json(resData);
  };
  res.sendError = (
    status: number,
    error: Object | Object[],
    message: string
  ) => {
    const resError: OResponse = {
      success: false,
      error: Array.isArray(error) ? error : [error],
      message: message,
    };
    return res.status(status).json(resError);
  };
  next();
};
