# Regras de Negócio

## Requisitos do Sistema

- [ ] Autenticação JWT
- [ ] Proteção de rotas
- [ ] RBAC - Autorização baseada em roles (PATIENT, PROFESSIONAL, ADMIN)
- [ ] Validação dos dados
- [ ] Documentação com SWAGGER
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
