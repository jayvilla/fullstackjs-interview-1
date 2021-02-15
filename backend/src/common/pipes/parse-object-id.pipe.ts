import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectId');
    }

    return new ObjectId(value);
  }
}
