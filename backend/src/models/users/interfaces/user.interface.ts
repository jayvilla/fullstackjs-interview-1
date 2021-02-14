import { Date } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
