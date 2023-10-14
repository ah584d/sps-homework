import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { UserRepository } from '../../repositories/db/user.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        const createdUser = await this.userRepository.createUser(createUserDto, session);
        return createdUser;
    }

    async getAllUSers() {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.getUserById(id);
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email);
    }
}
