import { corsHandler } from "@/lib/utils/cors";
import { catchErrors } from "@/lib/utils/middleware";
import prisma from '@/lib/prisma/prisma';
import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import HttpStatus from 'http-status-codes';

const getClapsForAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  // Get # claps for all posts, default to 0 if no claps found
  try {
    const result = await prisma.claps.aggregate({
      _sum: {
        claps: true,
      },
    });
    return res.status(200).json({ claps: result._sum.claps || 0 });
  } catch (e) {
    throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to get claps');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return catchErrors(endpoint, req, res)
}

export async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Allow options
  if (method == 'OPTIONS') {
    return res.status(200).end();
  }

  // CORS
  await corsHandler(req, res);

  switch (method) {
    case "GET":
      return getClapsForAllPosts(req, res);
    default:
      throw new ApiError(HttpStatus.METHOD_NOT_ALLOWED, `Method ${method} not allowed`);
  }
}
