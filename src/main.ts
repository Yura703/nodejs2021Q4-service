import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const useFastify = process.env['USE_FASTIFY'] === 'true';
  let app;
  if (useFastify) {
    app = await NestFactory.create(AppModule, new FastifyAdapter());
  } else {
    app = await NestFactory.create(AppModule);
  }

  await app.listen(process.env['PORT']);
}
bootstrap();
