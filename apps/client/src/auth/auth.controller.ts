import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { auth } from '@app/common';
import { AuthService } from './auth.service';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(GrpcToHttpInterceptor)
  signUp(@Body() signUpDto: auth.CreateUserDto): Observable<auth.User> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(GrpcToHttpInterceptor)
  login(@Body() loginDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.authService.login(loginDto);
  }
}
