import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: Number(process.env.PORT) || 3002,
      host: '0.0.0.0'
    },
  });

  await app.listen();
  console.log('File Service is running on TCP port 3002');
}
bootstrap();
