import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  login(loginAuthDto: LoginAuthDto) {
    return 'This action logs a user in';
  }

  register(registerAuthDto: RegisterAuthDto) {
    return 'This action registers a user';
  }
}
