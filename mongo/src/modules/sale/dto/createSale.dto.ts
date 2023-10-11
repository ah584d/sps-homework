import { IsNotEmpty } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

export class CreateSaleDto {
  @IsNotEmpty()
  productId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  userId: MongooseSchema.Types.ObjectId;

  @IsNotEmpty()
  total: number;
}
