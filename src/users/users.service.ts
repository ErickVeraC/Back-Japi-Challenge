import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }.exec());
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
