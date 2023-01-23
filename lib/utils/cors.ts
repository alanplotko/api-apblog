import type { NextApiRequest, NextApiResponse } from 'next';
import { createMiddlewareDecorator, NextFunction } from 'next-api-decorators';
import NextCors from 'nextjs-cors';

export const Cors = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'HEAD', 'POST'],
            origin: process.env.ORIGINS || '',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        next();
    }
);
