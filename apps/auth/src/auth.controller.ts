import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { auth } from '@app/common';
import { Observable } from 'rxjs';

@Controller()
@auth.AuthServiceControllerMethods()
export class AuthController implements auth.AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  signUpUser(createUserDto: auth.CreateUserDto): Observable<auth.User> {
    return this.authService.create(createUserDto);
  }

  login(loginUserDto: auth.LoginUserDto): Observable<auth.Token> {
    return this.authService.login(loginUserDto);
  }
}
