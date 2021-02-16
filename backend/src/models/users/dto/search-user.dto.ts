import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class SearchUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}
