import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        try {
            const newUser = await this.userService.createUser(createUserDto, session);
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getCompanyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const user = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }
}
