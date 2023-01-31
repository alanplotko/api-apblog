import { corsHandler } from "@/lib/utils/cors";
import { catchErrors } from "@/lib/utils/middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import HttpStatus from 'http-status-codes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return catchErrors(endpoint, req, res)
}

export async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // CORS
  await corsHandler(req, res);

  switch (method) {
    case "GET":
      return res.status(200).json({ statusCode: 200, message: 'API is online' });
    default:
      throw new ApiError(HttpStatus.METHOD_NOT_ALLOWED, `Method ${method} not allowed`);
  }
}
