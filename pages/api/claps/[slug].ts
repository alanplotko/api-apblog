import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma/prisma';
import { corsHandler } from '@/lib/utils/cors';
import { catchErrors } from '@/lib/utils/middleware';
import { ApiError } from 'next/dist/server/api-utils';
import HttpStatus from 'http-status-codes';

const checkSlug = (slug: string | string[] | undefined, url: string | undefined) => {
  // Post slug is required
  if (!slug) {
    throw new ApiError(HttpStatus.BAD_REQUEST, 'Post slug missing from request');
  }
  // Url is required and must contain the post slug
  if (Array.isArray(slug) || !url || !url.includes(slug)) {
    throw new ApiError(HttpStatus.BAD_REQUEST,'Invalid post slug');
  }
  return slug;
}

const getClapsForPost = async (req: NextApiRequest, res: NextApiResponse) => {
  // Eliminate bad calls
  const slug = checkSlug(req.query.slug, req.url);

  try {
    // Get # claps for post slug, default to 0 if not found
    const claps = await prisma.claps.findUnique({
      where: { slug },
      select: { claps: true },
    }) || { claps: 0 };

    return res.status(200).json(claps);
  } catch (e) {
    throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to get claps');
  }
}

const addClapsForPost = async (req: NextApiRequest, res: NextApiResponse) => {
  // Eliminate bad calls
  const slug = checkSlug(req.query.slug, req.url);
  const { claps } = req.body;

  try {
    // Increment claps for slug post or insert if not found
    const updatedClaps = await prisma.claps.upsert({
      where: { slug },
      update: {
        claps: {
          increment: claps
        }
      },
      create: { slug, claps },
      select: { claps: true }
    });
    return res.status(200).json(updatedClaps);
  } catch (e) {
    throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to add claps');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return catchErrors(endpoint, req, res)
}

export async function endpoint(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // CORS
  await corsHandler(req, res);

  switch (method) {
    case "OPTIONS":
      return res.status(200).end();
    case "GET":
      return getClapsForPost(req, res);
    case "PUT":
      return addClapsForPost(req, res);
    default:
      throw new ApiError(HttpStatus.METHOD_NOT_ALLOWED, `Method ${method} Not Allowed`);
  }
}
