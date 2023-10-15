import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { GetQueryDto } from './dto/getQueryDto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class ProductController {
    constructor(
        @InjectConnection() private readonly mongoConnection: Connection,
        private propertyService: PropertyService,
    ) {}

    // Non protected route to allow creating users for the Demo :-)
    @Post()
    async createProperty(@Body() createPropertyDto: CreatePropertyDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        try {
            const newProduct = await this.propertyService.createProperty(createPropertyDto, session);
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    async updateProperty(
        @Param('id') id: MongooseSchema.Types.ObjectId,
        @Body() updatePropertyDto: UpdatePropertyDto,
        @Res() res: Response,
    ) {
        const session = await this.mongoConnection.startSession();
        try {
            const newProduct = await this.propertyService.updateProperty({ ...updatePropertyDto, id }, session);
            return res.status(HttpStatus.OK).send(newProduct);
        } catch (error) {
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getPropertyById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage = await this.propertyService.getPropertyById(id);
        return res.status(HttpStatus.OK).send(storage);
    }
    @UseGuards(AuthGuard)
    @Get()
    async getAllProducts(@Query() getQueryDto: GetQueryDto, @Res() res: Response) {
        const storages = await this.propertyService.getProperties(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}
