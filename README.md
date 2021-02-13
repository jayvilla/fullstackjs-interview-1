# Sold.com Take Home Project

The goal of this project is to gauge your fullstack capabilities and knowledge in the following areas:

- React
- Typescript
- Component Organization
- Existing NextJS knowledge, or the ability to pick it up quickly

This project includes several common tools and frameworks for developing a modern-day full-stack react web application.

Includes a dockerfile for containerized development and/or deployment.

## Summary

This take home project includes frameworks that utilize the best practices for modern-day SPA (Single Page Applications) enforcing techniques such as _**code splitting, SSR (server-side rendering), material design, modular styles, state management, typing with typescript, prettier linting, unit testing, and more**_.

As a React developer, you should be able to dive in and start writing components!
_(don't worry about setting up config =])_

**Happy Coding!!!**

## Frameworks Included

### Major Dependencies worth mentioning

- [React (v16)](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/)
- [Material UI](https://material-ui.com/)
- [React Testing Library + Jest](https://github.com/testing-library/react-testing-library)
- [Redux](https://www.valentinog.com/blog/redux/)
- [Sass / SCSS (for styling)](https://sass-lang.com/)
- [Typescript](https://medium.com/@wittydeveloper/typescript-learn-the-basics-2f56eb9b02eb)

### Dev Dependencies worth mentioning

- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Prettier Linter](https://prettier.io/)
- [Redux Dev Tools Extension](https://github.com/reduxjs/redux-devtools)
- [Zsh + Powerlevel10k theme (docker container)](https://github.com/romkatv/powerlevel10k)

## Installation

For this project you will need to first install the following:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [NodeJS](https://nodejs.org/en/)

This lets us run things in an isolated docker container (aka isolated environment).

Install dependencies

```bash
npm install
```

## Docker Commands

Build container

```bash
docker-compose build
```

Start container

```bash
docker-compose up
```

Now you should be able to access via http://localhost:4000

## Requirements
