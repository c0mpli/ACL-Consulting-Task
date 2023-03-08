import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

const uri = 'mongodb+srv://root:root@cluster0.b4kiclv.mongodb.net/test';
@Module({
  imports: [
    TelegramModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(uri),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
