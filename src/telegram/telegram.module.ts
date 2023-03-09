import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/schemas/user.schema';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [TelegramService]
})
export class TelegramModule {}
