import { IsNotEmpty, IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreatePropertyDto {
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    propertyName: string;
    @IsOptional()
    status: string;
    @IsOptional()
    imageURL: string;
    @IsOptional()
    category: 'Condos' | 'Villas' | 'Open houses' | 'Lands' | 'Bought';
    @IsOptional()
    price: number;
}
