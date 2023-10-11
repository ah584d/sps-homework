import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [AuthModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
