import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/models/users/interfaces/user.interface';
import { UsersService } from 'src/models/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = (
      await this.usersService.search({
        firstName: '',
        lastName: '',
        email: username,
        phoneNumber: '',
      })
    )[0];
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser): Promise<{ access_token: string }> {
    const payload = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
