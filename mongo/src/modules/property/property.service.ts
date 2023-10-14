import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/modules/property/dto/getQueryDto';
import { PropertyRepository } from '../../repositories/db/property.repository';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Injectable()
export class PropertyService {
    constructor(private productRepository: PropertyRepository) {}

    async createProperty(createPropertyDto: CreatePropertyDto, session: ClientSession) {
        return await this.productRepository.createProperty(createPropertyDto, session);
    }

    async getPropertyById(productId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.getPropertyById(productId);
    }

    async getProperties(getQueryDto: GetQueryDto) {
        return await this.productRepository.getProperties(getQueryDto);
    }

    async updateProperty(updatePropertyDto: UpdatePropertyDto, session: ClientSession) {
        return await this.productRepository.updateProperty(updatePropertyDto, session);
    }
}
