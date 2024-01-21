# CodeTech Forum

CodeTech Forum é um projeto desenvolvido para estudar e aprofundar os conhecimentos em DDD e Clean Architecture usando NodeJS e Typescript.

A ideia do projeto é desenvolver o backend de um fórum para perguntas e respostas, usando conceitos e aplicando na prática o Domain Driven Design e Clean Architecture.

Além disso, serão desenvolvidos testes de unidade e testes de integração.

No primeiro momento está sendo desenvolvido a parte de domínio da aplicação. Posteriormente, será utilizado NestJS na camada de infraestrutura para a API e Prisma como ORM e PostgreSQL como banco de dados.

![example workflow](https://github.com/milena-mognon/code-tech-forum/actions/workflows/ci.yaml/badge.svg)

## 🛠️ Tecnologias Utilizadas

- Typescript
- NodeJS
- Vitest
- Eslint
- Prettier

### CI - Continuos Integration

Esse projeto contata também com pipelines de integração continua, visando a boa qualidade do código e garantindo o funcionamento com a execução dos testes,para isso será utilizado o Github Actions.

Outro objetivo para isso é o estudo sobre essa ferramenta e sua aplicação no dia a dia em softwares reais.

## DDD

### Aggregate

Conjunto de entidades que são manipuladas ao mesmo tempo.

### WatchedList

Lista Observada
Principalmente usado em edições
