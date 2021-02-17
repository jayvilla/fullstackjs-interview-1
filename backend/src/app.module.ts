import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://api_user:api1234@mongo:27017/interview-nestjs'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
