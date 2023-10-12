import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const config = new ConfigService();
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    await app.listen(config.getPortConfig());
}
bootstrap();
