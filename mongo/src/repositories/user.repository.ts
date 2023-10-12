import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { User } from './entities/user.entity';

export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        let user = await this.getUserByEmail(createUserDto.email);

        if (user) {
            throw new ConflictException('User already exists');
        }

        user = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            role: createUserDto.role,
        });

        try {
            user = await user.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new ConflictException('User not created');
        }

        return user;
    }

    async getAllUsers() {
        let users: User[];
        try {
            users = await this.userModel.find();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!users) {
            throw new NotFoundException('No user found');
        }

        return users;
    }

    async getUserById(id: string) {
        let user: User;
        try {
            user = await this.userModel.findById(id);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async getUserByEmail(email: string) {
        let user: User;
        try {
            user = await this.userModel.findOne({ email }, 'name email password role').exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return user;
    }
}
