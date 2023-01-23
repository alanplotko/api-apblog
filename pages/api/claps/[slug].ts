import type { NextApiRequest, NextApiResponse } from 'next';
import { Cors } from '@/lib/utils/cors';
import { MethodNotAllowedException, methodNotAllowedExceptionHandler } from '@/lib/utils/exceptions';
import { HmacMD5 } from 'crypto-js';
import Hex from 'crypto-js/enc-hex';
import anonymize from 'ip-anonymize';
import { BadRequestException, Catch, createHandler, Get, Header, InternalServerErrorException, Post, Query, Req, Res, SetHeader } from 'next-api-decorators';
import prisma from '@/lib/prisma/prisma';

const checkSlug = (slug: string | null | undefined) => {
  if (slug === null || slug === '') {
    throw new BadRequestException('Post slug missing from request.');
  }
}

const checkIp = (ip: string | null | undefined) => {
  if (ip === null) {
    throw new BadRequestException('Unable to validate user.');
  }
}

// Look into caching responses
// https://nextjs.org/docs/api-reference/next.config.js/headers#cache-control
@Catch(methodNotAllowedExceptionHandler, MethodNotAllowedException)
class ClapsHandler {
  @Get()
  @Cors()
  @SetHeader('Content-Type', 'application/json')
  async getClaps(@Req() req: NextApiRequest, @Res() res: NextApiResponse, @Query('slug') slug: string) {
    // Eliminate bad calls
    checkSlug(slug);

    try {
      const claps = await prisma.claps.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          claps: 0,
        },
        select: { claps: true },
      });

      return claps;
    } catch (e) {
      throw new InternalServerErrorException('Failed to add claps, please try again in a few moments.');
    }
  }

  @Post()
  @Cors()
  @SetHeader('Content-Type', 'application/json')
  async postClaps(@Header('CF-Connecting-IP') ipHeader: string, @Req() req: NextApiRequest, @Res() res: NextApiResponse, @Query('slug') slug: string, @Query('claps') requestedClaps: number) {
    // Setup
    let ip = anonymize(ipHeader || '');

    // Eliminate bad calls
    checkSlug(slug);
    checkIp(ip);
    try {
      ip = HmacMD5(ip || '', process.env.SECRET_KEY || '').toString(Hex);
      const claps = await prisma.claps.upsert({
        where: { slug },
        update: {
          claps: {
            increment: requestedClaps
          }
        },
        create: {
          slug,
          claps: requestedClaps,
        },
        select: { claps: true }
      });

      return claps;
    } catch (e) {
      throw new InternalServerErrorException('Failed to add claps, please try again in a few moments.');
    }
  }
}

export default createHandler(ClapsHandler);
