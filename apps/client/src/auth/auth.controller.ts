import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { auth } from '@app/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: auth.CreateUserDto): Observable<auth.User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: auth.LoginUserDto): Observable<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
