import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { auth } from '@app/common';
import { AuthService } from './auth.service';
import { RpcExceptionFilter } from '../filter/rpcExceptionFilter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseFilters(RpcExceptionFilter)
  @Post('signup')
  signUp(@Body() signUpDto: auth.CreateUserDto): Observable<auth.User> {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.authService.login(loginDto);
  }
}
