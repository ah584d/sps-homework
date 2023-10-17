import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./userLogin.dto";
import { UserType } from "../user.types";

export class CreateUserDto extends LoginUserDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: UserType;
}
