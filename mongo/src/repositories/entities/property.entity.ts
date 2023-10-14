import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class Property extends Document {
    @Prop({
        type: MongooseSchema.Types.ObjectId,
        required: false,
        ref: User.name,
    })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    propertyName: string;

    @Prop({ type: String })
    status: string;

    @Prop({ type: String, required: true })
    imageURL: string;

    @Prop({
        required: true,
        enum: ['Condos', 'Villas', 'Open houses', 'Lands', 'Bought'],
    })
    category: string;

    @Prop({
        required: true,
    })
    price: number;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Property);
