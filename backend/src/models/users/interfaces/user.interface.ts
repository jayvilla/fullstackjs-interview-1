import { Date, ObjectId } from 'mongoose';

export interface IUser {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
