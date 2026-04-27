import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '@/infra/auth/jwt/access-token.strategy';
import { AuthController } from '../../presentation/controllers/auth/auth.controller';
import { AuthService } from '../../application/services/auth/auth.service';
import { JWT_ACCESS_TOKEN_EXPIRATION, JWT_SECRET } from '@/shared/constants';
import { RefreshTokenController } from '../../presentation/controllers/auth/refresh-token.controller';
import { LogoutController } from '../../presentation/controllers/auth/logout.controller';
import { RefreshTokenStrategy } from './jwt/refresh-token.strategy';
import { RefreshTokenService } from '../../application/services/auth/refresh-token.service';
import { GetTokens } from './jwt/generate-jwt-tokens';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SECRET,
        signOptions: {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION,
        },
      }),
    }),
  ],
  controllers: [AuthController, RefreshTokenController, LogoutController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokenService,
    GetTokens,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
