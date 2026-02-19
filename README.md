# 📋 Task Manager - Full Stack Application

![Task Manager](https://imgur.com/a/DSM3VLP)

Um aplicativo completo de gerenciamento de tarefas desenvolvido com React, Node.js e MySQL.

## 📸 Screenshots

<img width="1919" height="909" alt="Rd1xsuv - Imgur" src="https://github.com/user-attachments/assets/aa82c0bc-c25c-4cf8-96a7-7910435986d4" />
<img width="1915" height="910" alt="gKxrZeS - Imgur" src="https://github.com/user-attachments/assets/95af4c94-c89b-474c-8626-bd5d546ea37d" />
<img width="1919" height="909" alt="0LMNajw - Imgur" src="https://github.com/user-attachments/assets/5139f3ae-69d5-4334-b49e-d3d820f7e774" />


## ✨ Funcionalidades

- ✅ Autenticação de usuários (registro/login) com JWT
- ✅ CRUD completo de tarefas
- ✅ Organização por drag-and-drop
- ✅ Filtros por prioridade (baixa, média, alta)
- ✅ Status das tarefas (pendente, em progresso, concluída)
- ✅ Categorias personalizadas
- ✅ Data de vencimento obrigatória
- ✅ Design responsivo com Tailwind CSS
- ✅ Sistema de notificações toast
- ✅ Interface moderna com efeito glassmorphism

## 🛠️ Tecnologias

### Backend
- **Node.js** + **Express** - API REST
- **MySQL** - Banco de dados relacional
- **Sequelize** - ORM para banco de dados
- **JWT** - Autenticação segura
- **Bcrypt** - Criptografia de senhas

### Frontend
- **React** - Biblioteca UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **React Router** - Navegação
- **Axios** - Requisições HTTP
- **DnD Kit** - Drag-and-drop
- **Context API** - Gerenciamento de estado

## 📦 Instalação

### Pré-requisitos
- Node.js (v20+)
- MySQL (v8+)
- npm ou yarn

### Backend
```bash
cd backend
npm install

### Crie um arquivo .env na pasta backend:
env
PORT=3001
DB_NAME=task_manager
DB_USER=root
DB_PASSWORD=sua_senha
DB_HOST=localhost
JWT_SECRET=sua_chave_secreta


### Frontend
bash
cd frontend
npm install
npm run dev

---------

👨‍💻 Autor
Selso Pacheco dos Santos Junior

LinkedIn: [pachecoselso](https://www.linkedin.com/in/pachecoselso/)
