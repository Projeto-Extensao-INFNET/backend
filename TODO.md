# Regras de Negócio

## Requisitos do Sistema

- [ ] Validação dos dados
- [ ] Deploy em alguma plataforma (Vercel ou Render)
- [ ] Cache com redis (?)
- [ ] Testes unitários, integração e E2E com vitest + supertest

## Regras Gerais do Sistema

- [ ] Agendamentos só podem ser feitos em horários disponíveis
- [ ] Pacientes só podem agendar com profissionais que tenham especialidade/tipo compatível
- [ ] Documentos CPF/RG e CRM/CRP devem ser únicos no sistema
- [x] Emails devem ser únicos no sistema
- [x] Senhas devem ser criptografadas
- [ ] Horários de agenda não podem conflitar
- [ ] O sistema deve ter filtros de pesquisa (faixa de preço, formato de consulta, gênero do profissional etc)

## Permissões por Tipo de Usuário

### 👤 PACIENTE

#### ✅ Pode

- [ ] Se cadastrar
- [ ] Consultar lista de profissionais
- [ ] Editar somente seu propio perfil ( do usuário logado)
- [ ] Excluir somente seu propio usuario logado
- [ ] Agendar consultas para o seu propio usuario logado
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

- [ ] Se cadastrar
- [ ] Visualizar pacientes que estão agendados com ele  
- [ ] Criar agenda com horários disponíveis
- [ ] Fazer upload de uma foto de perfil
- [ ] Editar somente seu propio perfil ( do usuário logado)
- [ ] Excluir somente seu propio usuario logado
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

- [ ] Autenticação JWT
- [ ] Proteção de rotas
- [ ] RBAC - Autorização baseada em roles (PATIENT, PROFESSIONAL, ADMIN)
- [ ] Documentação com SWAGGER

### 🔓 Rotas Públicas (sem autenticação JWT)

| Método | Rota | Descrição | Permissão |
|--------|------|-----------|-----------|
| `POST` | `/accounts` | Criar conta de usuário | Todos |
| `POST` | `/auth/login` | Login e obtenção do token JWT | Todos |
| `GET` | `/professionals` | Listar profissionais disponíveis | Todos |
| `GET` | `/specialties` | Listar especialidades | Todos |
| `GET` | `/treatment-types` | Listar tipos de tratamento | Todos |

### 🔒 Rotas Privadas (requerem autenticação JWT)

#### 👤 PACIENTE - Rotas

| Método | Rota | Descrição | Validação |
|--------|------|-----------|-----------|
| `GET` | `/accounts/me` | Ver próprio perfil | Próprio usuário |
| `PUT` | `/accounts/me` | Editar próprio perfil | Próprio usuário |
| `DELETE` | `/accounts/me` | Excluir própria conta | Próprio usuário |
| `POST` | `/appointments` | Agendar consulta | Próprio usuário |
| `GET` | `/appointments/me` | Ver próprios agendamentos | Próprio usuário |
| `PUT` | `/appointments/:id` | Alterar próprio agendamento | Próprio agendamento |
| `DELETE` | `/appointments/:id` | Cancelar próprio agendamento | Próprio agendamento |
| `GET` | `/professionals/:id` | Ver detalhes de profissional | Todos pacientes |

#### 👨‍⚕️ PROFISSIONAL - Rotas

| Método | Rota | Descrição | Validação |
|--------|------|-----------|-----------|
| `GET` | `/accounts/me` | Ver próprio perfil | Próprio usuário |
| `PUT` | `/accounts/me` | Editar próprio perfil | Próprio usuário |
| `DELETE` | `/accounts/me` | Excluir própria conta | Próprio usuário |
| `POST` | `/schedules` | Criar horários disponíveis | Próprio profissional |
| `GET` | `/schedules/me` | Ver própria agenda | Próprio profissional |
| `PUT` | `/schedules/:id` | Editar horário | Próprio horário |
| `DELETE` | `/schedules/:id` | Remover horário | Próprio horário |
| `GET` | `/appointments/me` | Ver agendamentos com pacientes | Próprios agendamentos |
| `POST` | `/profile/avatar` | Upload foto de perfil | Próprio usuário |
| `GET` | `/patients/me` | Ver pacientes agendados | Próprios pacientes |

#### 👑 ADMIN - Rotas

| Método | Rota | Descrição | Permissão |
|--------|------|-----------|-----------|
| `GET` | `/accounts` | Listar todos os usuários | Admin |
| `GET` | `/accounts/:id` | Ver usuário específico | Admin |
| `PUT` | `/accounts/:id` | Editar qualquer usuário | Admin |
| `DELETE` | `/accounts/:id` | Excluir qualquer usuário | Admin |
| `PUT` | `/accounts/:id/role` | Alterar role do usuário | Admin |
| `PUT` | `/accounts/:id/status` | Suspender/reativar conta | Admin |
| `GET` | `/appointments` | Ver todos os agendamentos | Admin |
| `POST` | `/specialties` | Criar especialidade | Admin |
| `PUT` | `/specialties/:id` | Editar especialidade | Admin |
| `DELETE` | `/specialties/:id` | Excluir especialidade | Admin |
| `POST` | `/treatment-types` | Criar tipo de tratamento | Admin |
| `PUT` | `/treatment-types/:id` | Editar tipo de tratamento | Admin |
| `DELETE` | `/treatment-types/:id` | Excluir tipo de tratamento | Admin |

### 🛡️ Regras de Autorização

- **Autenticação:** Todas as rotas privadas requerem token JWT válido
- **RBAC:** Sistema baseado em roles (PATIENT, PROFESSIONAL, ADMIN)
- **Propriedade:** Usuários só podem acessar/modificar seus próprios recursos
- **Validação:** Documentos (CPF/RG/CRM/CRP) devem ser únicos
- **Agendamentos:** Só podem ser feitos em horários disponíveis
- **Compatibilidade:** Pacientes só podem agendar com profissionais de especialidade compatível
