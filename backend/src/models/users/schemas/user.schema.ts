import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: UserDocument, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class User implements IUser {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true, index: true, trim: true })
  email: string;

  @Prop({ required: true, unique: true, trim: true })
  phoneNumber: string;

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
