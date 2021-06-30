import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

require('dotenv').config();


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET_KEY"], //TODO: add to ENV
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username };
    // return payload;
  }
}