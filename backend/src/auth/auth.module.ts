import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

require('dotenv').config();


@Module({
  imports: [
    UserModule , PassportModule, 
    JwtModule.register({
      secret: process.env["JWT_SECRET_KEY"],
      signOptions: { expiresIn: '60m' }
    })
  ],
  providers: [AuthService , LocalStrategy , SessionSerializer, AuthModule, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
