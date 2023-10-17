import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { HouseStatus } from 'src/modules/property/property.consts';
import { CreatePropertyDto } from '../../modules/property/dto/createProperty.dto';
import { GetQueryDto } from '../../modules/property/dto/getQueryDto';
import { UpdatePropertyDto } from '../../modules/property/dto/updateProperty.dto';
import { Property } from '../entities/property.entity';

export class PropertyRepository {
    constructor(@InjectModel(Property.name) private readonly propertyModel: Model<Property>) {}

    async createProperty(createPropertyDto: CreatePropertyDto, session: ClientSession) {
        let product = new this.propertyModel({
            userId: createPropertyDto.userId,
            propertyName: createPropertyDto.propertyName,
            category: createPropertyDto.category,
            imageURL: createPropertyDto.imageURL,
            price: createPropertyDto.price,
            status: HouseStatus.toSold,
        });

        try {
            product = await product.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return product;
    }

    async updateProperty(updateProperty: UpdatePropertyDto, session: ClientSession) {
        const actualDate = new Date();
        const update = {
            userId: updateProperty.userId,
            status: updateProperty.status,
            propertyName: updateProperty.propertyName,
            category: updateProperty.category,
            imageURL: updateProperty.imageURL,
            price: updateProperty.price,
            updatedAt: actualDate,
        };

        let product: Property;
        try {
            product = await this.propertyModel
                .findOneAndUpdate({ _id: updateProperty.id }, update)
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new ConflictException('Error trying to update property');
        }

        return product;
    }

    async getProperties(
        userId?: MongooseSchema.Types.ObjectId,
        isAdmin?: boolean,
        pageIndex?: number,
    ) {
        const [start, end] = this.getQueryLimits(pageIndex);

        const from = start || 0;
        const limit = end || 0;

        console.log(`====> DEBUG from: ${from} limit: ${limit}`);
        let products: Property[];

        // filter the properties for which the userId matches, or if the property does not have userId defined.
        // If user is admin, do not apply any filter
        const filter = !isAdmin
            ? {
                  $or: [{ userId: userId }, { userId: { $exists: false } }],
              }
            : undefined;

        try {
            if (limit === 0) {
                products = await this.propertyModel
                    .find(filter)
                    .populate('userId', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                products = await this.propertyModel
                    .find()
                    .populate('userId', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            return products.length > 0 ? products : [];
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getPropertyByUserId(userId: MongooseSchema.Types.ObjectId, isAdmin?: boolean, pageIndex?: number) {
        let properties: Property[];
        try {
            properties = await this.getProperties(userId, isAdmin, pageIndex);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!properties) {
            throw new NotFoundException(`No property found for user ${userId}`);
        }

        return properties;
    }

    async getPropertyById(id: MongooseSchema.Types.ObjectId) {
        let property: Property;
        try {
            property = await this.propertyModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!property) {
            throw new NotFoundException('The property with this id does not exist');
        }

        return property;
    }

    getQueryLimits(pageIndex?: number) {
        if (pageIndex < 1) {
            console.warn('Input must be a positive integer greater than or equal to 1.');
            return undefined;
        }

        const from = (pageIndex - 1) * 6;
        const limit = pageIndex * 6;

        return [from, limit];
    }
}
