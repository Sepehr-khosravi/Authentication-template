import { Module } from '@nestjs/common';
//Modules
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/project"),//your db address
    ConfigModule.forRoot({}),
  ],
})
export class AppModule {}
