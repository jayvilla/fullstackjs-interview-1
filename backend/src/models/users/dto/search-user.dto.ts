import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class SearchUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
}
