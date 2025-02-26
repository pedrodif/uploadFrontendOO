# Estrutura do Projeto  

Este projeto foi desenvolvido utilizando uma arquitetura modular que segue os princípios de separação de responsabilidades. A estrutura está organizada em camadas para facilitar a manutenção e escalabilidade do código. Abaixo, serão descritas suas pastas e seu propósito:  

## 1. **Pages**  
A pasta **pages** contém os arquivos HTML referentes às páginas da aplicação. O arquivo principal, index.html, está localizado aqui e serve como ponto de entrada para o frontend.  

## 2. **Assets**  
Nesta pasta estão armazenados os recursos estáticos, como:  
- **css**: Contém estilos globais e específicos para componentes.  
  - global.css: Arquivo de estilos globais.  
  - **components**: Estilos específicos para componentes reutilizáveis.  
- **img**: Recursos de imagem utilizados no projeto.  

## 3. **JS**  
![Diagrama](/assets/uml/diagrama-arq-front-poo.png "Diagrama")

A pasta js contém toda a lógica de programação e está organizada em subpastas que seguem o padrão MVC (Model-View-Controller) com extensões:  
- **api-client**: Lida com a comunicação com APIs externas.  
- **app**: Representa o núcleo da aplicação, sendo responsável por sua inicialização.  
- **controller**: Gerencia a interação entre a **view** e a **service**, controlando o fluxo de dados.  
- **model**: Representa os dados e lógica de negócios da aplicação.  
- **service**: Atua como uma ponte entre a **controller**, a **model** e o **api-client**, orquestrando todas as operações.  
- **view**: Responsável por renderizar a interface para o usuário.  
- **utils**: Utilitários.  

## 4. **Tests com Jest**

A pasta **tests** contém os arquivos de teste, organizados de maneira similar à estrutura da pasta **JS**, para garantir que cada parte da aplicação seja adequadamente testada. Cada subpasta em **tests** corresponde a uma subpasta na pasta **JS** e contém os testes das classes ou componentes presentes nas respectivas pastas.  

A estrutura da pasta **tests** inclui:  
- **api-client**: Testes para a comunicação com APIs externas.  
- **app**: Testes para a inicialização e o núcleo da aplicação.  
- **controller**: Testes para a interação entre a **view** e a **service**, verificando o fluxo de dados.  
- **model**: Testes para as classes de dados e lógica de negócios.  
- **service**: Testes para a ponte entre as camadas **model** e **api-client**.  
- **view**: Testes para a renderização da interface do usuário.  
- **utils**: Testes para funções utilitárias.

### Executando os Testes

Para configurar e executar os testes com Jest, siga os passos abaixo:

1. **Inicializar o projeto com `npm init -y`:**

   Crie o arquivo `package.json` com as configurações padrão:

   ```bash
   npm init -y
   ```
2. **Instalar o Jest como dependência de desenvolvimento:**

   Instale o Jest para rodar os testes:

   ```bash
   npm install --save-dev jest
   ```

3. **Instalar as dependências do Babel:**

   Instale o Babel para que o Jest possa transpilar o código JavaScript:

   ```bash
   npm install --save-dev jest babel-jest @babel/preset-env
   ```

4. **Instalar o jest JSDOM**
   
   Isso permite que os testes sejam executados em um ambiente que simula o comportamento de um navegador, incluindo o document, o window e outros elementos do DOM.

   ```bash
   npm install --save-dev jest-environment-jsdom
   ```

 5. **Editar o `package.json`:**

   No arquivo `package.json`, adicione ou edite as seguintes informações, exemplo:

   ```json
   {
  "name": "uploadfrontendoo",
  "version": "1.0.0",
  "description": "Este projeto foi desenvolvido utilizando uma arquitetura modular que segue os princípios de separação de responsabilidades.",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/preset-env": "^7.26.9",
    "babel-jest": "^29.7.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  },
  "jest": {
    "transform": {
      "^.+\\.js$": "babel-jest"
    },
    "testEnvironment": "jsdom"
  },
  "babel": {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "current"
          }
        }
      ]
    ]
  },
  "type": "module"
}
  ```

6. **Instalar as dependências do projeto:**

   Atualize todas as dependências necessárias, incluindo o Jest e o Babel:

   ```bash
   npm install
   ```
7. **Rodar os testes com `npm test`:**

   Após a configuração, execute os testes com o seguinte comando:

   ```bash
   npm test
   ```
### Observações

- **Node.js**: Certifique-se de ter o Node.js instalado. Você pode verificar a instalação executando:

  ```bash
  node -v
  ```
  
###  Utilizando o Debugger com Jest no VS Code
Ao criar os testes, pode ser necessário usar o modo debugger para identificar problemas. Veja o passo a passo abaixo:

1 - **Altere o `package.json`**
Adicione ou modifique o script de depuração para Jest:

```json
"scripts": {
  "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand"
}
```

2 - **Abra o menu "Run and Debug"**
No VS Code, vá para a aba **"Run and Debug"** (ou pressione `Ctrl+Shift+D`).

3 - **Crie um arquivo `launch.json`**
Se ainda não existir, clique em **"Create a launch.json file"**.

4 - **Escolha a opção "Node.js"**
Ao ser solicitado, selecione **"Node.js"** como o ambiente de depuração.

5 - **Configure o `launch.json`**
Adicione ou edite seu `launch.json` com a seguinte configuração:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Jest Tests",
            "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
            "args": [
                "--runInBand",
                "--watchAll=false"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

6 - **Adicione Breakpoints**
Marque os pontos de parada (breakpoints) no código onde deseja inspecionar a execução.

7 - **Rode o seguinte comando no terminal**

```sh
npm run test:debug
```

8 - **Inicie a Depuração**
Clique no botão **▶ Iniciar Depuração** para rodar os testes e pausar nos breakpoints.

  

