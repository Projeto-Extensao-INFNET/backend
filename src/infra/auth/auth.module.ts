import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/infra/auth/jwt/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { env } from '@/config/env';
import { JWT_ACCESS_TOKEN_EXPIRATION } from '@/shared/constants';
import { RefreshTokenController } from './controllers/refresh-token.controller';
import { RefreshTokenService } from './services/refresh-token.service';
import { LogoutController } from './controllers/logout.controller';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: env.JWT_SECRET,
        signOptions: {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
        },
      }),
    }),
  ],
  controllers: [AuthController, RefreshTokenController, LogoutController],
  providers: [AuthService, JwtStrategy, RefreshTokenService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
