import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  // @IsEmail() - re-enable to only accept emails (less flexible)
  email: string;

  @ApiProperty()
  @IsOptional()
  // @IsPhoneNumber() - re-enable to only accept phone numbers (less flexible)
  phoneNumber: string;
}
