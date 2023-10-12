import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    // Warning ❗👇
    // Of course in a real application, you wouldn't store a password in plain text.
    // You'd instead use a library like bcrypt, with a salted one-way hash algorithm.
    // With that approach, you'd only store hashed passwords, and then compare the stored password to a hashed version of the incoming password,
    // thus never storing or exposing user passwords in plain text.
    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.name };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
