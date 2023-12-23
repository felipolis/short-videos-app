# Short Videos App

Bem-vindo à nossa aplicação de videos curtos! Aqui, você pode se cadastrar e postar videos, alem de interagir com o post de seus amigos dando seu like e comentário.

### Recursos Principais:

* **Cadastro de Usuários:** Registre-se facilmente para começar a utilizar a plataforma.
* **Criação de Posts:** Poste videos cursos na plataforma com uma pequena descrição
* **Curtidas:** Curta os videos de outras pessoas
* **Comentários:** Faça comentários a fim de interagir na plataforma

### Tecnologias

* ReactJs, TailwindCSS, Zustand, Apollo Client
* Nestjs, Prisma, Postgres, GraphQL, Apollo Server, Docker

### Como Executar

1. Clone o repositório
   ```bash
   git clone https://github.com/felipolis/short-videos-app.git
   ```
2. Execute o docker-compose para o postgres
   ```bash
   cd short-videos-app
   cd backend
   docker-compose up
   ```
3. Preencha as varaveis de ambiente do backend com o que for de sua preferência
   ```bash
   cp .env.example .env
   ```
4. Instale as dependencias do backend e inicie o servidor
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
5. Instale as dependencias do frontend e inicie o client
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
6. Gere os arquivos do graphQL (opcional)
   ```bash
   cd frontend
   npx graphql-codegen --watch --verbose
   ```
