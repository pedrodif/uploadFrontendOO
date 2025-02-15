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

## 4. **Tests**

A pasta **tests** contém os arquivos de teste, organizados de maneira similar à estrutura da pasta **JS**, para garantir que cada parte da aplicação seja adequadamente testada. Cada subpasta em **tests** corresponde a uma subpasta na pasta **JS** e contém os testes das classes ou componentes presentes nas respectivas pastas.  

A estrutura da pasta **tests** inclui:  
- **api-client**: Testes para a comunicação com APIs externas.  
- **app**: Testes para a inicialização e o núcleo da aplicação.  
- **controller**: Testes para a interação entre a **view** e a **service**, verificando o fluxo de dados.  
- **model**: Testes para as classes de dados e lógica de negócios.  
- **service**: Testes para a ponte entre as camadas **model** e **api-client**.  
- **view**: Testes para a renderização da interface do usuário.  
- **utils**: Testes para funções utilitárias.

### Executando os Testes com Jest

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
 3. **Editar o `package.json`:**

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
       "jest": "^29.7.0",
       "babel-jest": "^29.0.0",
       "@babel/preset-env": "^7.0.0"
     },
     "jest": {
       "transform": {
         "^.+\\.js$": "babel-jest"
       },
       "testEnvironment": "node"
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
     }
   }
  ```
4. **Instalar as dependências do Babel:**

   Instale o Babel para que o Jest possa transpilar o código JavaScript:

   ```bash
   npm install --save-dev jest babel-jest @babel/preset-env
   ```

5. **Instalar as dependências do projeto:**

   Atualiza todas as dependências necessárias, incluindo o Jest e o Babel:

   ```bash
   npm install
   ```
6. **Rodar os testes com `npm test`:**

   Após a configuração, execute os testes com o seguinte comando:

   ```bash
   npm test
   ```
### Observações

- **Node.js**: Certifique-se de ter o Node.js instalado no seu sistema. Você pode verificar a instalação executando:

  ```bash
  node -v
  ```
  

