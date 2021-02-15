import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async deleteUser(id: ObjectId): Promise<any> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException();
    }
    await this.userModel.deleteOne({ _id: id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: ObjectId): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user.toJSON();
  }

  async updateUser(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    await this.userModel
      .updateOne(
        {
          _id: id,
        },
        {
          ...user,
          ...updateUserDto,
        },
      )
      .exec();
    return await this.findById(id);
  }

  async search(searchUserDto: SearchUserDto): Promise<User[]> {
    const res = await this.userModel.find(searchUserDto).exec();
    return res.map((r) => r.toJSON());
  }
}
