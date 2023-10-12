import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { CreateProductDto } from '../modules/product/dto/createProduct.dto';
import { UpdateProductDto } from '../modules/product/dto/updateProduct.dto';
import { Product } from './entities/product.entity';

export class ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async createProduct(createProductDto: CreateProductDto, session: ClientSession) {
        let product = new this.productModel({
            user: createProductDto.userId,
            productName: createProductDto.productName,
            category: createProductDto.category,
            imageURL: createProductDto.imageURL,
            status: 'CREATED',
        });
        try {
            product = await product.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return product;
    }

    async updateProduct(updateProduct: UpdateProductDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            user: updateProduct.userId,
            status: updateProduct.status,
            productName: updateProduct.productName,
            category: updateProduct.category,
            imageURL: updateProduct.imageURL,
            updatedAt: actualDate,
        };

        let product: Product;
        try {
            product = await this.productModel
                .findOneAndUpdate({ _id: updateProduct.id }, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new ConflictException('Error trying to update product');
        }

        return product;
    }

    async getProducts(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let products: Product[];

        try {
            if (limit === 0) {
                products = await this.productModel
                    .find()
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                products = await this.productModel
                    .find()
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (products.length > 0) {
                response = {
                    ok: true,
                    data: products,
                    message: 'Get Products Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No product founds',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getProductById(id: MongooseSchema.Types.ObjectId) {
        let product: Product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!product) {
            throw new NotFoundException('The product with this id does not exist');
        }

        return product;
    }
}
