# uploadFrontendPOO - Estrutura do Projeto  

Este projeto foi desenvolvido utilizando uma arquitetura modular que segue os princípios de separação de responsabilidades. A estrutura está organizada em camadas para facilitar a manutenção e escalabilidade do código. Abaixo, serão descritas suas pastas e seu propósito:  

## 1. **Pages**  
A pasta **pages** contém os arquivos HTML referentes às páginas da aplicação. O arquivo principal, `index.html`, está localizado aqui e serve como ponto de entrada para o frontend.  

## 2. **Assets**  
Nesta pasta estão armazenados os recursos estáticos, como:  
- **css**: Contém estilos globais e específicos para componentes.  
  - `global.css`: Arquivo de estilos globais.  
  - **components**: Estilos específicos para componentes reutilizáveis.  
- **img**: Recursos de imagem utilizados no projeto.  

## 3. **js**  
A pasta `js` contém toda a lógica de programação e está organizada em subpastas que seguem o padrão MVC (Model-View-Controller) com extensões:  
- **api-client**: Lida com a comunicação com APIs externas.  
- **app**: Representa o núcleo da aplicação, sendo responsável por sua inicialização.  
- **controller**: Gerencia a interação entre a **view** e a **service**, controlando o fluxo de dados.  
- **model**: Representa os dados e lógica de negócios da aplicação.  
- **service**: Atua como uma ponte entre a **controller**, a **model** e o **api-client**, orquestrando todas as operações.  
- **view**: Responsável por renderizar a interface para o usuário.  
- `Utils.js`: Biblioteca de funções utilitárias.  

Essa estrutura foi desenhada para manter o projeto organizado e facilitar o desenvolvimento colaborativo.  
