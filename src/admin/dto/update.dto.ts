import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly isSubscribed: boolean;

  @IsNotEmpty()
  readonly frequency: string;

  @IsNotEmpty()
  readonly model: string;
}
