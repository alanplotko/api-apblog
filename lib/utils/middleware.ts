import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import HttpStatus from 'http-status-codes';

export const catchErrors = async (fn: Function, req: NextApiRequest, res: NextApiResponse) => {
  return fn(req, res)
    .catch((error: unknown) => {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message });
      }
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(statusCode).json({ statusCode, message: 'An unknown error occurred' })
    });
}