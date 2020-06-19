# NextJS-Docker-Base-Template

A base template that includes several common tools and frameworks for developing a modern-day full-stack react web application.

Includes a dockerfile for containerized development and/or deployment.

## Summary

This empty project includes frameworks that utilize the best practices for modern-day SPA (Single Page Applications) enforcing techniques such as _**code splitting, SSR (server-side rendering), material design, modular styles, state management, typing with typescript, prettier linting, unit testing, and more**_.

Any React developer can just dive in and start writing components!
_(no more wasting set up time or stressing over config =])_

I've set this repo up so that **YOU** don't have to!

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

## Installation

If you already have [Node.js](https://nodejs.org/en/download/) installed, and would like to continue to develop on your local machine, then skip to [Local Development section](#local-development).

Otherwise, the other option will be to install [Docker](https://docs.docker.com/get-docker/), so that we can run things in an isolated docker container (aka isolated environment).

## Local Development

```bash
npm i
npm run dev
```

This will start server at http://localhost:3002.

See **package.json** for an exhaustive list of commands.

## Docker Commands

Build container image

```bash
docker build -t my-next-project .
```

Run container image

```bash
docker run --name=my-next-project --rm -p 4000:3000 my-next-project
```

Now you should be able to access via http://localhost:4000

## Todo

- [ ] Install zsh + powerlevel10k theme
  - For pretty terminal when ssh-ing to container
- [ ] Split configs for dev / prod environments
- [ ] Wire up webpack bundle analyzer
