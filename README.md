# 🏋️‍♂️ WorkoutFlow

Sistema completo de gestão de alunos e treinos, desenvolvido com foco em organização, performance, segurança e experiência do usuário.

🔗 **Acesse o projeto:**
https://workout-flow-fj5g-lucas-vasconcelos-s-projects.vercel.app/

---

# ✨ Funcionalidades

## 🔐 Autenticação e Segurança

* Cadastro de usuários
* Login com JWT
* Senhas criptografadas com bcrypt
* Middleware de autenticação
* Rotas protegidas
* Isolamento completo dos dados por usuário
* Validação de permissões

---

## 📊 Dashboard Inteligente

* Total de alunos cadastrados
* Total de treinos cadastrados
* Alunos ativos e inativos
* Receita mensal estimada
* Receita total estimada
* Crescimento de alunos por mês
* Indicadores estratégicos para acompanhamento do negócio
* Integração com gráficos utilizando Recharts

---

## 👥 Gestão de Alunos

### CRUD Completo

* ➕ Criar aluno
* ✏️ Editar aluno
* 🗑️ Excluir aluno
* 📋 Listagem paginada
* 🔎 Busca dinâmica por nome
* Controle de status ativo/inativo
* Associação automática ao usuário autenticado

### Planos Disponíveis

* Básico
* Intermediário
* Avançado

---

## 💪 Gestão de Treinos

### CRUD Completo

* ➕ Criar treino
* ✏️ Editar treino
* 🗑️ Excluir treino
* 📋 Listagem de treinos
* Associação entre alunos e treinos
* Validação automática de relacionamentos

---

## 🏋️ Gestão de Exercícios

* ➕ Adicionar exercícios aos treinos
* ✏️ Editar exercícios
* 🗑️ Excluir exercícios

### Controle de:

* Nome do exercício
* Séries
* Repetições
* Carga (kg)

---

## 🎨 UX e Interface

* Layout moderno inspirado em SaaS
* Sidebar responsiva
* Dashboard interativo
* Modais para criação e edição
* Feedback visual em tempo real
* Toasts de sucesso e erro
* Formulários validados
* Navegação intuitiva

---

# 🛠️ Tecnologias Utilizadas

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* React Router DOM

---

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcrypt

---

## Bibliotecas

* React Hook Form
* Zod
* Recharts
* React Hot Toast
* Lucide React

---

# 🐳 Docker

O projeto possui configuração Docker para facilitar:

* Ambiente de desenvolvimento
* Padronização do ambiente
* Deploy
* Integração com banco de dados PostgreSQL

## Tecnologias Containerizadas

* Frontend React
* Backend Node.js
* PostgreSQL

---

# 🧱 Arquitetura do Projeto

## Frontend

```bash
src/
├── components/
├── layouts/
├── pages/
├── routes/
├── schemas/
├── services/
├── types/
└── config/
```

## Backend

```bash
src/
├── auth/
├── controllers/
├── middleware/
├── routes/
├── schemas/
├── services/
├── lib/
├── prisma/
└── server.ts
```

---

# 🗄️ Modelagem de Dados

Relacionamentos implementados:

```text
User
 ├── Students
 └── Workouts

Student
 └── Workouts

Workout
 └── Exercises
```

---

# 🔐 Segurança Implementada

* Autenticação JWT
* Hash de senhas com bcrypt
* Proteção de rotas privadas
* Isolamento multiusuário
* Validação de dados com Zod
* Validação de relacionamentos no backend
* Tratamento centralizado de erros
* Tipagem forte com TypeScript

---

# 🧠 Conceitos Aplicados

* CRUD Completo
* API REST
* Arquitetura em Camadas
* TypeScript Fullstack
* Prisma ORM
* PostgreSQL
* Docker e Docker Compose
* JWT Authentication
* Validação com Zod
* Paginação
* Busca dinâmica
* Relacionamentos entre entidades
* Dashboards analíticos
* Visualização de dados com gráficos
* Componentização React
* Hooks
* Clean Code
* Responsividade
* UX/UI inspirada em SaaS

---

# 🌐 Deploy

## Frontend

Hospedado na Vercel.

## Backend

API Node.js hospedada na Render e integrada ao PostgreSQL utilizando Prisma ORM.

---

# 🚀 Como Executar o Projeto

## Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

## Instale as Dependências

### Frontend

```bash
npm install
```

### Backend

```bash
npm install
```

---

## Configure as Variáveis de Ambiente

### Backend (.env)

```env
DATABASE_URL=
JWT_SECRET=
```

### Frontend (.env)

```env
VITE_API_URL=
```

---

## Executar com Docker

```bash
docker compose up --build
```

---

## Executar Localmente

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

# 💼 Sobre o Projeto

O WorkoutFlow foi desenvolvido como um projeto Fullstack moderno para simular uma aplicação real de gestão de alunos, treinos e acompanhamento de métricas para personal trainers e academias.

O projeto aplica boas práticas de desenvolvimento frontend e backend, autenticação segura, arquitetura escalável, validação de dados, containerização com Docker e visualização de informações através de dashboards analíticos.

---

# 👨‍💻 Autor

Lucas Vasconcelos

---

# ⭐ Feedback

Se gostou do projeto:

* Deixe uma ⭐ no repositório
* Compartilhe o projeto
* Envie sugestões e feedbacks
* Conecte-se comigo no LinkedIn

---
