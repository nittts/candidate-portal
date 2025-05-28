# Portal Banco de Talentos

## Pré-requisitos

- Node.js v20 ou superior
- Banco de dados MySQL configurado
- Yarn ou npm

## Configuração

1. **Clone o repositório**

```bash
git clone https://github.com/nittts/candidate-portal.git
cd candidate-portal
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Crie e configure o arquivo .env**

```bash
cp .env.example .env
```

Edite o arquivo .env para adicionar as credenciais do banco de dados e outras variáveis de ambiente necessárias.

4. **Execute as migrations**

```bash
cd backend
node ace migration:run
```

5. **(Opcional) Execute o seeder para popular o banco**

```bash
cd backend
node ace db:seed
```

## Rodando a aplicação

Inicie o servidor de desenvolvimento com:

```bash
cd backend
node ace serve --watch
```

Inicie o ambiente web com:

```bash
cd frontend
yarn preview
```

A aplicação estará disponível em http://localhost:5173
