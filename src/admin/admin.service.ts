import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
      ) {

      }
    getUserData(){
        return this.userModel.find()
    }

    async updateUserData(UpdateDto){
        const { userId, isSubscribed, frequency, model } = UpdateDto;

        const user = await this.userModel.findOneAndUpdate({userId:userId},{isSubscribed:isSubscribed,frequency:frequency,model:model})
        console.log(user)
        
    }
}
