import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from '../../repositories/entities/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { UserModule } from '../user/user.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService, ProductRepository],
})
export class ProductModule {}
