# PokéData — Pokédex Interativa

**Autor:** Guilherme Luiz Santos Chebile

Projeto acadêmico desenvolvido com React e Vite para consultar Pokémon e treinadores a partir do arquivo de dados fornecido na atividade.

## Funcionalidades

- Lista dos 151 Pokémon presentes no arquivo JSON.
- Pesquisa por nome ou número da Pokédex.
- Filtro por tipo de Pokémon.
- Ordenação por número, nome, ataque, HP e velocidade.
- Visualização dos seis atributos: HP, ataque, defesa, ataque especial, defesa especial e velocidade.
- Sistema de favoritos com armazenamento no navegador usando `localStorage`.
- Área de treinadores com insígnias e Pokémon relacionados.
- Botão para selecionar um Pokémon aleatório.
- Interface adaptada para computadores e celulares.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- Lucide React para ícones

As imagens dos Pokémon são carregadas dos sprites públicos do repositório PokéAPI no GitHub. Os dados principais são armazenados localmente no arquivo `src/data/pokedex-data.json`. Dessa forma, a pesquisa, os filtros, os atributos e a lista de treinadores utilizam os dados do projeto, sem depender de chamadas a uma API para essas informações.

## Como executar o projeto

É necessário ter o Node.js instalado no computador.

1. Extraia o arquivo ZIP do projeto.
2. Abra a pasta `pokedex-react` no VS Code.
3. Abra o terminal dentro da pasta que contém o arquivo `package.json`.
4. Instale as dependências:

   ```bash
   npm install
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Abra no navegador o endereço informado pelo Vite, normalmente `http://localhost:5173`.

Para verificar se o projeto compila para produção, execute:

```bash
npm run build
```

## Estrutura do projeto

```text
pokedex-react/
├── public/
├── src/
│   ├── components/
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonDetails.jsx
│   │   └── TrainerSection.jsx
│   ├── css/
│   │   └── App.css
│   ├── data/
│   │   └── pokedex-data.json
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Organização do código

- **`App.jsx`:** controla a interface principal, a pesquisa, os filtros, a ordenação e os favoritos.
- **`PokemonCard.jsx`:** exibe as informações resumidas de cada Pokémon e permite acessar os detalhes ou adicionar aos favoritos.
- **`PokemonDetails.jsx`:** apresenta os atributos do Pokémon selecionado.
- **`TrainerSection.jsx`:** exibe os treinadores, suas insígnias e os Pokémon associados.
- **`pokedex-data.json`:** contém os dados utilizados pela aplicação, incluindo Pokémon, tipos, treinadores e suas relações.
- **`App.css` e `index.css`:** definem os estilos da aplicação e a adaptação da interface a diferentes tamanhos de tela.

## Considerações finais

O projeto foi desenvolvido com o objetivo de facilitar a consulta e a organização das informações dos Pokémon e treinadores. A utilização de componentes React permite separar as responsabilidades da interface e facilita a manutenção do código.

Os dados são carregados a partir do arquivo JSON fornecido para a atividade, enquanto os favoritos são armazenados no navegador para permanecerem salvos durante as próximas visitas, no mesmo navegador.