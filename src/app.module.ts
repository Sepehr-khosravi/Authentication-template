import { Module } from '@nestjs/common';
//Modules
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataBaseModule } from './common/database/database.module';
import { JwtModule, JwtService } from '@nestjs/jwt';


const config = new ConfigService();

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/project"),//your db address
    ConfigModule.forRoot({}),
    DataBaseModule,
    JwtModule.register({
      global : true,
      secret : config.get("JWT_KEY")
    })
  ],
  providers : [ConfigService, JwtService ]
})
export class AppModule {}
