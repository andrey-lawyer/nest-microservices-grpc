import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { IJwtPayload } from './types/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || 'JWT_SECRET',
    });
  }

  async validate(payload: IJwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token.');
    }
    const { id, userEmail } = payload;
    return { id, userEmail };
  }
}
