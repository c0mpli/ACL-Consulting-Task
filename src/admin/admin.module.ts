import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../auth/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [  
    AuthModule,  
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {
  
}
