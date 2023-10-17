import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PropertyRepository } from '../../repositories/db/property.repository';
import { ProductSchema, Property } from '../../repositories/entities/property.entity';
import { UserModule } from '../user/user.module';
import { ProductController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Property.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [PropertyService, PropertyRepository],
    exports: [PropertyService, PropertyRepository],
})
export class ProductModule {}
