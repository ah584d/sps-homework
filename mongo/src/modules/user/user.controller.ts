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

    // Non protected route to allow creating users for the Demo :-)
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
    @Get()
    async getAllUsers(@Res() res: Response) {
        const users = await this.userService.getAllUSers();
        return res.status(HttpStatus.OK).send(users);
    }


    @UseGuards(AuthGuard)
    @Get('/:id')
    async getUserById(@Param('id') id: string, @Res() res: Response) {
        const user = await this.userService.getUserById(id);
        return res.status(HttpStatus.OK).send(user);
    }

    @UseGuards(AuthGuard)
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string, @Res() res: Response) {
        const user = await this.userService.getUserByEmail(email);
        return res.status(HttpStatus.OK).send(user);
    }
}
