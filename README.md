# Desafio Técnico - CRUD de Clientes (React)

  Este projeto é uma aplicação SPA (Single Page Application) para o gerenciamento de clientes, desenvolvida com React, TypeScript e Vite, conforme solicitado no desafio técnico. A aplicação consome uma API REST simulada e possui suporte a três fluxos diferentes de edição para demonstrar diferentes abordagens de UI/UX.

##🚀 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

 - Node.js (versão 20.19.1)
 - Git
 - Editor de código de sua preferência (recomendado: VSCode com extensões ESLint e Prettier)

##📦 Dependências Principais

  O projeto foi construído utilizando as seguintes tecnologias:

 - React 18 (com Hooks e Function Components)
 - TypeScript (Tipagem estática rigorosa)
 - Vite (Build tool e servidor de desenvolvimento)
 - React Router DOM v6 (Para navegação entre telas via SPA)
 - Mockoon (Para simular a API REST)

 ##🛠️ Como executar a aplicação

  O projeto é dividido em duas partes: o Front-end (React) e o Mock de API (JSON Server). Você precisará de dois terminais abertos para rodar ambos simultaneamente.

  - Passo 1: Clonar e instalar as dependências
  
    No primeiro terminal, na raiz do projeto, execute:
    ```bash
    # Instalar as dependências do front-end
    npm install
    ```

  - Passo 2: Iniciar o Mock de API

    Abrir o Mockoon e colocar na configuração o arquivo demo.json, e clicar no botão verde com imagem de play "Start local server".
  
  - Passo 3: Iniciar o Front-end React

    No segundo terminal, execute:
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em http://localhost:5173.