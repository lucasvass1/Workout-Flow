# 🏋️‍♂️ WorkoutFlow

Sistema completo de gestão de alunos e treinos para academias, desenvolvido com foco em performance, organização e experiência do usuário.

🔗 **Acesse o projeto:**  
https://workout-flow-fj5g-lucas-vasconcelos-s-projects.vercel.app/

---

# ✨ Funcionalidades

## 🔐 Autenticação de usuários

- Cadastro de usuários
- Login com JWT
- Rotas protegidas
- Middleware de autenticação
- Isolamento de dados por usuário

---

## 📊 Dashboard

- Visão geral do sistema
- Total de alunos
- Total de treinos
- Métricas por aluno
- Estrutura preparada para gráficos e analytics

---

## 👥 Gestão de alunos (CRUD completo)

- ➕ Criar aluno
- ✏️ Editar aluno
- 🗑️ Deletar aluno
- 📋 Listagem paginada
- 🔎 Busca dinâmica

---

## 💪 Gestão de treinos

- ➕ Criar treino
- 🗑️ Remover treino
- 📋 Listagem de treinos
- 🏋️ Gestão de exercícios por treino
- 🔗 Relacionamento entre alunos, treinos e exercícios

---

## 🎨 UX e Interface

- Layout estilo SaaS
- Sidebar responsiva
- Dashboard moderno
- Modais para criação/edição
- Feedback visual em tempo real
- Toasts de sucesso e erro
- Formulários validados

---

# 🛠️ Tecnologias utilizadas

## Frontend

- React
- TypeScript
- TailwindCSS
- React Router DOM

---

## Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer

---

## Bibliotecas

- React Hook Form
- Zod
- Recharts
- React Hot Toast
- Lucide React

---

# 🐳 Docker

O projeto possui configuração Docker para facilitar:

- Ambiente de desenvolvimento
- Padronização do ambiente
- Deploy
- Integração com banco de dados

## Tecnologias containerizadas

- Frontend React
- Backend Node.js
- PostgreSQL

---

# 🧱 Arquitetura do projeto

## Frontend

```bash
src/
 ├── components/
 ├── layouts/
 ├── pages/
 ├── schemas/
 ├── services/
 ├── types/
 └── routes/
```

---

## Backend

```bash
server/
 ├── middleware/
 ├── routes/
 ├── auth/
 ├── config/
 ├── lib/
 └── prisma/
```

---

# 🔐 Segurança implementada

- Autenticação JWT
- Proteção de rotas
- Validação de ownership por usuário
- Isolamento de dados multiusuário
- Validação de formulários
- Tratamento de erros
- Upload seguro de imagens

---

# 🧠 Conceitos aplicados

- CRUD completo
- API REST
- Arquitetura modular
- Componentização
- Middleware de autenticação
- Upload de arquivos
- Relacionamentos com Prisma
- Paginação
- Busca dinâmica
- Validação com Zod
- Gerenciamento de estado com Hooks
- UI/UX moderna inspirada em SaaS

---

# 🌐 Deploy

## Frontend

Hospedado na Vercel.

## Backend

API Node.js integrada ao PostgreSQL utilizando Prisma ORM.

---

# 🚀 Como executar o projeto

## Clone o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## Instale as dependências

### Frontend

```bash
npm install
```

### Backend

```bash
npm install
```

---

## Configure as variáveis de ambiente

Crie um arquivo `.env` no backend:

```env
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Execute com Docker

```bash
docker-compose up
```

---

## Execute localmente

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm run dev
```

---

# 💼 Sobre o projeto

O WorkoutFlow foi desenvolvido como um projeto fullstack com arquitetura moderna, simulando um sistema real de gestão para academias.

O objetivo principal foi aplicar boas práticas de desenvolvimento frontend e backend, incluindo autenticação, segurança, organização de código e experiência do usuário.

---

# 👨‍💻 Autor

Desenvolvido por Lucas Vasconcelos  
📍 Brasil

---

# ⭐ Feedback

Se gostou do projeto:

- Deixe uma estrela no repositório
- Compartilhe o projeto
- Envie sugestões e feedbacks

---
