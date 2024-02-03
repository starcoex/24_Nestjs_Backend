import { NextFunction, Request, Response } from 'express';

export const ignoreFavicon = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.originalUrl.includes('favicon.ico')) {
    res.status(204).end();
  }
  next();
};
