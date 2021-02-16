import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber: string;
}
