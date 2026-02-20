# 📋 Task Manager

Task Manager é uma aplicação full-stack completa de gerenciamento de tarefas que desenvolvi para colocar em prática meus conhecimentos em desenvolvimento web. O projeto permite que usuários se registrem, façam login e gerenciem suas tarefas de forma intuitiva, com recursos como drag-and-drop, categorização por prioridade e notificações de prazos.

A motivação principal foi criar uma ferramenta útil para o dia a dia enquanto aprendia na prática como integrar frontend, backend e banco de dados em uma aplicação real.

## 🛠️ Tecnologias que Usei

**Frontend:**
- ⚛️ **React 18** - Biblioteca para construção da interface
- ⚡ **Vite** - Build tool para desenvolvimento rápido
- 🎨 **Tailwind CSS** - Estilização moderna e responsiva
- 🧭 **React Router** - Navegação entre páginas
- 🔌 **Axios** - Requisições HTTP para a API
- 🖱️ **DnD Kit** - Drag-and-drop para organizar tarefas

**Backend:**
- 🟢 **Node.js** - Runtime JavaScript
- 🚂 **Express** - Framework para construção da API
- 🗄️ **MySQL** - Banco de dados relacional
- 🔗 **Sequelize** - ORM para modelagem do banco
- 🔐 **JWT** - Autenticação segura com tokens
- 🔒 **Bcrypt** - Criptografia de senhas

## ✨ Recursos / O que o usuário pode fazer

- ✅ **Criar conta e fazer login** - Sistema completo de autenticação com JWT
- ✅ **Gerenciar tarefas** - Criar, editar, visualizar e excluir tarefas
- ✅ **Organizar por prioridade** - Classificar tarefas como baixa, média ou alta
- ✅ **Definir status** - Marcar como pendente, em progresso ou concluída
- ✅ **Categorizar** - Adicionar categorias personalizadas às tarefas
- ✅ **Estabelecer prazos** - Data de vencimento obrigatória para planejamento
- ✅ **Reordenar com drag-and-drop** - Arrastar tarefas para reorganizar a lista
- ✅ **Receber notificações** - Alertas visuais (toasts) para ações e prazos
- ✅ **Interface responsiva** - Funciona em desktop, tablet e mobile
- ✅ **Design moderno** - Efeito glassmorphism e gradientes

## 🔧 Processo / Como o construí

O desenvolvimento começou pela modelagem do banco de dados com Sequelize, criando as tabelas de usuários e tarefas com seus relacionamentos. Em seguida, construí a API REST com Node.js e Express, implementando rotas para autenticação (registro/login) e operações CRUD das tarefas, protegidas por middleware JWT.

No frontend, estruturei o projeto com Vite e React, criando componentes reutilizáveis e páginas. Usei Context API para gerenciar notificações toast em toda a aplicação. A biblioteca DnD Kit foi essencial para implementar o drag-and-drop de forma suave e intuitiva.

O maior desafio foi integrar todas as partes - garantir que o frontend se comunicasse corretamente com a API, que os tokens JWT fossem enviados em cada requisição, e que a experiência do usuário fosse fluida. As validações no formulário de criação de tarefas e o sistema de notificações para prazos próximos foram recursos que exigiram atenção especial aos detalhes.

Por fim, padronizei toda a identidade visual com Tailwind CSS, mantendo a paleta de cores consistente em todas as telas e adicionando efeitos glassmorphism para um visual moderno.

## 📚 O que aprendi

- **Arquitetura full-stack** - Como estruturar um projeto completo desde o banco de dados até a interface do usuário
- **Autenticação segura** - Implementar registro, login e proteção de rotas com JWT e bcrypt
- **ORM com Sequelize** - Modelar relacionamentos (um-para-muitos) e fazer consultas ao banco
- **Gerenciamento de estado** - Usar Context API para compartilhar notificações entre componentes
- **Drag-and-drop** - Implementar reordenação intuitiva com DnD Kit
- **Validações** - Criar formulários com feedback visual e validações em tempo real
- **Design system** - Manter consistência visual com Tailwind CSS
- **Experiência do usuário** - Adicionar notificações toast para feedback das ações

## 🚀 Como ele pode ser melhorado

- [ ] **Modo escuro** - Alternar entre tema claro e escuro mantendo a identidade visual
- [ ] **Compartilhamento de listas** - Permitir que usuários compartilhem tarefas com outras pessoas
- [ ] **Gráficos e estatísticas** - Dashboard com produtividade, tarefas concluídas por período
- [ ] **Subtarefas** - Dividir tarefas complexas em itens menores
- [ ] **Anexos** - Upload de arquivos e imagens nas tarefas
- [ ] **Busca e filtros** - Pesquisar tarefas e filtrar por categoria/status
- [ ] **Exportação de dados** - Exportar tarefas para CSV ou PDF
- [ ] **Modo offline** - Funcionar sem internet e sincronizar quando voltar

## 💻 Como executar o projeto

### Pré-requisitos
- Node.js 20+
- MySQL 8+
- npm ou yarn

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/devselso/task-manager.git
cd task-manager

# Configuração do Backend
cd backend
npm install

# Crie um arquivo .env na pasta backend com as seguintes variáveis:
# PORT=3001
# DB_NAME=task_manager
# DB_USER=root
# DB_PASSWORD=sua_senha
# DB_HOST=localhost
# JWT_SECRET=sua_chave_secreta

# Crie o banco de dados MySQL
# Acesse o MySQL e execute: CREATE DATABASE task_manager;

# Inicie o servidor backend
npm run dev

# Em outro terminal, configure o Frontend
cd frontend
npm install
npm run dev

# Acesse http://localhost:5173 no seu navegador

Credenciais para teste
Email: teste@email.com
Senha: 123456
Ou crie sua própria conta na tela de registro

📸 Screenshot

<img width="1919" height="909" alt="Rd1xsuv - Imgur" src="https://github.com/user-attachments/assets/aa82c0bc-c25c-4cf8-96a7-7910435986d4" />
<img width="1919" height="909" alt="0LMNajw - Imgur" src="https://github.com/user-attachments/assets/5139f3ae-69d5-4334-b49e-d3d820f7e774" />
<img width="1915" height="910" alt="gKxrZeS - Imgur" src="https://github.com/user-attachments/assets/95af4c94-c89b-474c-8626-bd5d546ea37d" />
