import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export const corsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'PUT', 'OPTIONS'],
    origin: process.env.ORIGINS,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
}
