import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdArrayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    for(const str of value)
    {  
      if(!isValidObjectId(str))
      {
        throw new BadRequestException(`${str} is not a valid MongoID`);
      }
    }
    return value;
  }
}
