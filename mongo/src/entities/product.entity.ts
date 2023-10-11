import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "./user.entity";

@Schema()
export class Product extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  productName: string;

  @Prop({ type: String })
  status: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: false,
    ref: User.name,
  })
  client: unknown;

  @Prop({ type: String, required: true })
  imageURL: string;

  @Prop({
    required: true,
    enum: ["Condos", "Villas", "Open houses", "Lands", "Bought"],
  })
  category: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
