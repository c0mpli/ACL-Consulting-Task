import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    default: '',
  })
  username: string;

  @Prop({
    default: true,
  })
  isSubscribed: boolean;

  @Prop({
    default: 'iphone 14',
  })
  model: string;

  @Prop({
    default: 'daily',
  })
  frequency: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
