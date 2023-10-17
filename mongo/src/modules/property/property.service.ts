import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/modules/property/dto/getQueryDto';
import { PropertyRepository } from '../../repositories/db/property.repository';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { UserRepository } from 'src/repositories/db/user.repository';

@Injectable()
export class PropertyService {
    constructor(private productRepository: PropertyRepository, private userRepository: UserRepository) {}

    async createProperty(createPropertyDto: CreatePropertyDto, session: ClientSession) {
        return await this.productRepository.createProperty(createPropertyDto, session);
    }

    async updateProperty(updatePropertyDto: UpdatePropertyDto, session: ClientSession) {
        return await this.productRepository.updateProperty(updatePropertyDto, session);
    }

    async getProperties() {
        return await this.productRepository.getProperties();
    }

    async getPropertyById(propertyId: MongooseSchema.Types.ObjectId) {
        return await this.productRepository.getPropertyById(propertyId);
    }

    async getPropertyByUserId(userId: MongooseSchema.Types.ObjectId, pageIndex: number) {
        const userDetails = await this.userRepository.getUserById(userId);
        return await this.productRepository.getPropertyByUserId(userId, userDetails?.role === 'ADMIN', pageIndex);
    }
}
