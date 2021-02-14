import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter<MongoError> extends BaseExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    switch (exception['code']) {
      case 11000:
        response.status(400).json({
          message: `User already exists.`,
          keyValue: exception['keyValue'],
        });
      default:
        super.catch(exception, host);
    }
  }
}
