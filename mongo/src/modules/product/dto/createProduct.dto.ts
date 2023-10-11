import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateProductDto {
    @IsNotEmpty()
    productName: string;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    status: string;
    @IsNotEmpty()
    imageURL: string;
    @IsNotEmpty()
    category: 'Condos' | 'Villas' | 'Open houses' | 'Lands' | 'Bought';
}
