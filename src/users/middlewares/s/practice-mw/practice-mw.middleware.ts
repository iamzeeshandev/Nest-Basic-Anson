import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PracticeMwMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example Middleware');
    console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if (!authorization)
      throw new HttpException('No Authorization Token', HttpStatus.FORBIDDEN);
    if (authorization === 'asdfasdfzxcvbnm') next();
    else
      throw new HttpException(
        'Invalid Authorization Token',
        HttpStatus.FORBIDDEN,
      );
  }
}
