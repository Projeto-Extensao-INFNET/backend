/* 
TODO: GUARD SIMPLES PARA PROTEGER ROTAS

1. INSTALAR DEPENDÊNCIAS:
   - [ ] pnpm add passport passport-jwt @nestjs/passport
   - [ ] pnpm add -D @types/passport-jwt

2. CRIAR GUARD BÁSICO:
   - [ ] Guard que verifica se token é válido
   - [ ] Se válido = deixa passar
   - [ ] Se inválido = bloqueia com erro 401

3. USAR NO CONTROLLER:
   - [ ] @UseGuards(JwtAuthGuard) na rota
   - [ ] Pronto! Rota está protegida
*/
