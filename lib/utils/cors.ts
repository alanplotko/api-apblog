import type { NextApiRequest, NextApiResponse } from "next";
import { UnauthorizedException } from "next-api-decorators";
import NextCors from "nextjs-cors";

export const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cors = await NextCors(req, res, {
    // Options
    methods: ['GET', 'PUT', 'OPTIONS'],
    origin: process.env.ORIGINS,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (cors instanceof Error) {
    throw new UnauthorizedException();
  }
}
