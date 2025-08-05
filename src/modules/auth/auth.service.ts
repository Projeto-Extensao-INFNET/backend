/* 
TODO: JWT SIMPLES - Service de Autenticação:

1. IMPLEMENTAR APENAS O BÁSICO:
   - [ ] Instalar: pnpm add @nestjs/jwt
   - [ ] Método login(email, password) que retorna { access_token }
   - [ ] Verificar se usuário existe
   - [ ] Comparar senha
   - [ ] Gerar token JWT

2. IMPORTS MÍNIMOS:
   - [ ] import { Injectable, UnauthorizedException } from '@nestjs/common';
   - [ ] import { JwtService } from '@nestjs/jwt';
   - [ ] import { PrismaService } from '../prisma/prisma.service';
   - [ ] import { comparePassword } from '@/utils';


RESUMO: Buscar user → Verificar senha → Gerar token → Retornar
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
	async SignIn() {}
}
