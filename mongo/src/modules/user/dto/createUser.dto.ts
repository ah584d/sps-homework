import { IsNotEmpty, IsString } from "class-validator";
import { LoginUserDto } from "./userLogin.dto";

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
  role: "ADMIN" | "USER";
}
