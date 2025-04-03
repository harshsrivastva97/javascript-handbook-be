import { Response } from "express";

export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
  error?: string;
}
  
export const sendResponse = <T>( res: Response, statusCode: number, response: ApiResponse<T>) => {
  res.status(statusCode).json(response);
};