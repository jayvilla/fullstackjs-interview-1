import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
