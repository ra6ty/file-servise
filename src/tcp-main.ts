import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: Number(process.env.PORT),
        },
    });

    await app.listen();
    console.log('✅ File Service (TCP) is running on port', process.env.PORT);
}
bootstrap();
