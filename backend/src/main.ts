import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './models/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swagConfig = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('API for managing our users in Mongo')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const usersDocument = SwaggerModule.createDocument(app, swagConfig, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/users', app, usersDocument);

  await app.listen(3000);
}
bootstrap();
