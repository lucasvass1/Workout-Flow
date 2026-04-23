# 🏋️‍♂️ WorkoutFlow

Sistema de gestão de alunos para academias, com foco em performance, organização e experiência do usuário.

🔗 **Acesse o projeto:**
https://workout-flow-fj5g.vercel.app/

---

## 🚀 Funcionalidades

### 📊 Dashboard

* Visão geral do sistema
* Cards com métricas
* Gráfico de crescimento de alunos

### 👥 Gestão de Alunos (CRUD completo)

* ➕ Criar aluno
* ✏️ Editar aluno
* 🗑️ Deletar aluno
* 📋 Listagem dinâmica

### 💎 UX e Interface

* Modal para criação/edição
* Validação de formulário com feedback em tempo real
* Toasts de sucesso/erro
* Layout estilo SaaS (sidebar + dashboard)

---

## 🛠️ Tecnologias utilizadas

### Frontend

* React
* TypeScript
* TailwindCSS

### Bibliotecas

* React Hook Form
* Zod
* React Router DOM
* Recharts
* React Hot Toast
* Lucide Icons

---

## 📂 Estrutura do projeto

```
src/
 ├── components/
 │   ├── Card.tsx
 │   ├── Modal.tsx
 │   └── StudentsChart.tsx
 │
 ├── pages/
 │   ├── Dashboard.tsx
 │   ├── Students.tsx
 │   └── Workouts.tsx
 │
 ├── schemas/
 │   └── studentSchema.ts
 │
 ├── services/
 │   └── students.ts
 │
 ├── types/
 │   └── student.ts
 │
 └── layouts/
     └── MainLayout.tsx
```

---

## 🧠 Conceitos aplicados

* Componentização
* Gerenciamento de estado com React Hooks
* Formulários profissionais com validação (React Hook Form + Zod)
* CRUD completo no frontend
* UI/UX moderna inspirada em SaaS
* Separação de responsabilidades (schemas, types, services)

---

## 🌐 Deploy

O projeto está hospedado na plataforma Vercel.

---

## 📈 Próximos passos

* Integração com backend (Node.js + Prisma)
* Autenticação de usuários
* Módulo de treinos completo
* Persistência de dados em banco

---

## 💼 Sobre o projeto

Este projeto foi desenvolvido com foco em prática profissional de frontend, simulando um sistema real de gestão.

---

## 👨‍💻 Autor

Desenvolvido por Lucas Vasconcelos
📍 Brasil

---

## ⭐ Se gostou do projeto

Deixe uma estrela no repositório e compartilhe!
