import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Sale, SaleSchema } from '../../repositories/entities/sale.entity';
import { SaleRepository } from '../../repositories/sale.repository';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
    imports: [
        UserModule,
        ProductModule,
        MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ],
    controllers: [SaleController],
    providers: [SaleService, SaleRepository],
    exports: [SaleService, SaleRepository],
})
export class SaleModule {}
