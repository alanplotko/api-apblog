import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpException } from 'next-api-decorators';

export class MethodNotAllowedException extends HttpException {
  public constructor(message: string = 'Method Not Allowed') {
    super(405, message);
  }
}

export const methodNotAllowedExceptionHandler = (
  error: MethodNotAllowedException,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.status(405).end();
}

export const exceptionHandler = (
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const message = error instanceof Error ? error.message : 'An unknown error occurred.';
  res.status(500).json({ statusCode: 500, error: message });
}
