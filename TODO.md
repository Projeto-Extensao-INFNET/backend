# Regras de Negócio

- [x] Refatorar a arquitetura do projeto
- [x] Dockerizar o Nest corretamente no modo de dev
- [ ] Aplicar arquitetura limpa e recomendações do NestJS
- [ ] Unificar services e controllers por domínio (talvez fazer o mesmo com testes unitários e E2E)
- [ ] Verificar se existem testes unitários que na verdade são de integração e vice-versa
- [ ] Corrigir testes unitários e e2e nas validações das exceptions
- [ ] Refatorar testes usando o video: <https://www.youtube.com/watch?v=XjfWQ46ePWg> e <https://www.youtube.com/watch?v=N8-XBjZPkmQ&t=1326s>
- [x] Quebrar services em arquivos separados (arquivos de teste também)
- [x] Adicionar paginação
- [x] Adicionar Swagger
- [x] Usar o Dockerfile(talvez refatorar o de deploy ou criar um de dev) no docker-compose para rodar o app direto no docker
- [x] Corrigir erro nos seeds do banco de dados

## JWT

[x] - Criar função strategy de criar o refresh token e renomear a que gera o access token e registrar nos providers do AuthModule
[x] - Validar os tempos de expiration dos tokens
[x] - Passar os valores das constants pro .env, validar no env schema e repassar pro index.ts das constants
[x] - Validar a tipagem do payload recebido pelas funções que geram os tokens e comparar o token com o DTO de Auth
[x] - Receber os tokens no AuthService (via construtor? ou via params numa função async?)
[x] - Melhorar a validação do envio/recebimento dos tokens presente nos cookies nos controllers (Refresh e SignIn)

## Opcional

- [x] Criar repositórios e entidades para cada caso de uso
- [x] Comentários explicativos nos arquivos de testes (me ajudar a lembrar o que fazem)
- [x] Refatorar para usar Pulumi no lugar do Terraform

## Requisitos do Sistema

- [x] Validação dos dados
- [x] Deploy em alguma plataforma (Vercel, fly.io, AWS ou Render) - Pulumi configurado para AWS
- [x] Cache com redis (?)
- [x] Testes unitários, integração e E2E com vitest + supertest

## Regras Gerais do Sistema

- [x] Agendamentos só podem ser feitos em horários disponíveis
- [ ] Pacientes só podem agendar com profissionais que tenham especialidade/tipo compatível
- [x] Documentos CPF/RG e CRM/CRP devem ser únicos no sistema
- [x] Emails devem ser únicos no sistema
- [x] Senhas devem ser criptografadas
- [ ] Horários de agenda não podem conflitar
- [ ] O sistema deve ter filtros de pesquisa (faixa de preço, formato de consulta, gênero do profissional etc)

## Permissões por Tipo de Usuário

### 👤 PACIENTE

#### ✅ Pode

- [x] Se cadastrar
- [x] Consultar lista de profissionais
- [x] Editar somente seu propio perfil ( do usuário logado)
- [x] Excluir somente seu propio usuario logado
- [x] Agendar consultas para o seu propio usuario logado (CreateAppointmentsService implementado)
- [ ] Alterar sua propia consulta para o seu propio usuario logado
- [ ] Excluir sua propia consulta para o seu propio usuario logado
- [ ] Pode marcar consultas com base em horários e categorias de atendimento

#### ❌ Não pode

- [ ] Não pode alterar agendamentos dos profissionais
- [ ] Não pode criar uma agenda (apenas profissionais terão agendas)
- [ ] Não pode mudar a ROLE (apenas ADMIN pode)
- [ ] Não pode interferir em outros usuários (ver seus dados, excluir etc)

### 👨‍⚕️ PROFISSIONAL

#### ✅ Pode

- [x] Se cadastrar
- [x] Visualizar pacientes que estão agendados com ele
- [ ] Criar agenda com horários disponíveis
- [x] Fazer upload de uma foto de perfil
- [x] Editar somente seu propio perfil ( do usuário logado)
- [x] Excluir somente seu propio usuario logado
- [ ] Cadastrar suas categorias de atendimento (ex: psicologia infantil, casais etc)
- [ ] Se cadastrar em uma categoria de profissional (Psiquiatria ou Psicologia)

#### ❌ Não pode

- [ ] Agendar consultas
- [ ] Não pode interferir em outros usuários (ver seus dados, excluir etc)
- [ ] Não pode aceitar pacientes sem que eles tenham agendado primeiro
- [ ] Não pode mudar a ROLE (apenas ADMIN pode)

### 👑 ADMIN

#### ✅ Pode

- [ ] Gerenciar todos os usuários (criar, editar, excluir)
- [ ] Alterar ROLE de qualquer usuário
- [ ] Criar/editar/excluir especialidades
- [ ] Criar/editar/excluir tipos de tratamento
- [ ] Visualizar todos os agendamentos da plataforma
- [ ] Moderar conexões entre profissionais e pacientes
- [ ] Suspender ou reativar contas
- [ ] Gerenciar configurações globais da plataforma

#### ❌ Não pode

- [ ] Agendar consultas como paciente (deve criar conta separada)
- [ ] Oferecer serviços como profissional (deve criar conta separada)

## 📋 API Routes

- [x] Autenticação JWT - ✅ **Auth module implementado**
- [x] Proteção de rotas
- [x] RBAC - Autorização baseada em roles (PATIENT, PROFESSIONAL, ADMIN)
- [x] Documentação com SWAGGER

### 🔓 Rotas Públicas (sem autenticação JWT)

| Método | Rota                 | Descrição                               | Permissão | Status                          |
| ------ | -------------------- | --------------------------------------- | --------- | ------------------------------- |
| `POST` | `/auth/signup`       | Criar conta de usuário                  | Todos     | ✅ **Implementado + E2E Tests** |
| `POST` | `/auth/signin`       | Login e obtenção do token JWT           | Todos     | ✅ **Implementado + E2E Tests** |
| `GET`  | `/professionals`     | Listar profissionais disponíveis        | Todos     | ✅ **Implementado**             |
| `GET`  | `/professionals/:id` | Ver detalhes de profissional específico | Todos     | ✅ **Implementado**             |
| `GET`  | `/specialty`         | Listar especialidades                   | Todos     | ✅ **Implementado**             |
| `GET`  | `/treatment-type`    | Listar tipos de tratamento              | Todos     | ✅ **Implementado**             |

### 🔒 Rotas Privadas (requerem autenticação JWT)

#### 👤 PACIENTE - Rotas

| Método   | Rota                 | Descrição                    | Validação           | Status              |
| -------- | -------------------- | ---------------------------- | ------------------- | ------------------- |
| `GET`    | `/accounts/me`       | Ver próprio perfil           | Próprio usuário     | ✅ **Implementado** |
| `PATCH`  | `/accounts/me`       | Editar próprio perfil        | Próprio usuário     | ✅ **Implementado** |
| `DELETE` | `/accounts/me`       | Excluir própria conta        | Próprio usuário     | ✅ **Implementado** |
| `POST`   | `/appointments`      | Agendar consulta             | Próprio usuário     | ✅ **Implementado** |
| `GET`    | `/appointments/me`   | Ver próprios agendamentos    | Próprio usuário     |                     |
| `PATCH`  | `/appointments/:id`  | Alterar próprio agendamento  | Próprio agendamento |                     |
| `DELETE` | `/appointments/:id`  | Cancelar próprio agendamento | Próprio agendamento |                     |
| `GET`    | `/professionals/:id` | Ver detalhes de profissional | Todos pacientes     |                     |

#### 👨‍⚕️ PROFISSIONAL - Rotas

| Método   | Rota                  | Descrição                      | Validação             | Status              |
| -------- | --------------------- | ------------------------------ | --------------------- | ------------------- |
| `GET`    | `/accounts/me`        | Ver próprio perfil             | Próprio usuário       | ✅ **Implementado** |
| `PUT`    | `/accounts/me`        | Editar próprio perfil          | Próprio usuário       |                     |
| `DELETE` | `/accounts/me`        | Excluir própria conta          | Próprio usuário       | ✅ **Implementado** |
| `POST`   | `/schedules`          | Criar horários disponíveis     | Próprio profissional  | 🚧 **Em Progresso** |
| `GET`    | `/schedules/me`       | Ver própria agenda             | Próprio profissional  | 🚧 **Em Progresso** |
| `PUT`    | `/schedules/:id`      | Editar horário                 | Próprio horário       | 🚧 **Em Progresso** |
| `DELETE` | `/schedules/:id`      | Remover horário                | Próprio horário       | 🚧 **Em Progresso** |
| `GET`    | `/appointments/me`    | Ver agendamentos com pacientes | Próprios agendamentos | ✅ **Implementado** |
| `POST`   | `/accounts/me/avatar` | Upload foto de perfil          | Próprio usuário       | ✅ **Implementado** |
| `GET`    | `/patients/me`        | Ver pacientes agendados        | Próprios pacientes    |                     |

#### 👑 ADMIN - Rotas

| Método   | Rota                   | Descrição                  | Permissão | Status              |
| -------- | ---------------------- | -------------------------- | --------- | ------------------- |
| `GET`    | `/accounts`            | Listar todos os usuários   | Admin     | ✅ **Implementado** |
| `GET`    | `/accounts/:id`        | Ver usuário específico     | Admin     | ✅ **Implementado** |
| `PUT`    | `/accounts/:id`        | Editar qualquer usuário    | Admin     | ✅ **Implementado** |
| `DELETE` | `/accounts/:id`        | Excluir qualquer usuário   | Admin     | ✅ **Implementado** |
| `PUT`    | `/accounts/:id/role`   | Alterar role do usuário    | Admin     |                     |
| `PUT`    | `/accounts/:id/status` | Suspender/reativar conta   | Admin     |                     |
| `GET`    | `/appointments`        | Ver todos os agendamentos  | Admin     |                     |
| `POST`   | `/specialty`           | Criar especialidade        | Admin     |                     |
| `PUT`    | `/specialty/:id`       | Editar especialidade       | Admin     |                     |
| `DELETE` | `/specialty/:id`       | Excluir especialidade      | Admin     |                     |
| `POST`   | `/treatment-type`      | Criar tipo de tratamento   | Admin     |                     |
| `PUT`    | `/treatment-type/:id`  | Editar tipo de tratamento  | Admin     |                     |
| `DELETE` | `/treatment-type/:id`  | Excluir tipo de tratamento | Admin     |                     |

### 🛡️ Regras de Autorização

- **Autenticação:** Todas as rotas privadas requerem token JWT válido
- **RBAC:** Sistema baseado em roles (PATIENT, PROFESSIONAL, ADMIN)
- **Propriedade:** Usuários só podem acessar/modificar seus próprios recursos
- **Validação:** Documentos (CPF/RG/CRM/CRP) devem ser únicos
- **Agendamentos:** Só podem ser feitos em horários disponíveis
- **Compatibilidade:** Pacientes só podem agendar com profissionais de especialidade compatível
