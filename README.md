# NextJS-Docker-Base-Template

A base template that includes several common tools and frameworks for developing a modern-day full-stack react web application.

Includes a dockerfile for containerized development and/or deployment.

## Summary

This empty project includes frameworks that utilize the best practices for modern-day SPA (Single Page Applications) enforcing techniques such as _**code splitting, SSR (server-side rendering), material design, modular styles, state management, typing with typescript, prettier linting, unit testing, and more**_.

Any React developer can just dive in and start writing components!
_(no more wasting set up time or stressing over config =])_

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

If you already have [Node.js](https://nodejs.org/en/download/) installed, and would like to continue to develop on your local machine, then skip to [Local Development section](#local-development).

Otherwise, the other option will be to install [Docker](https://docs.docker.com/get-docker/), so that we can run things in an isolated docker container (aka isolated environment).

## Local Development

```bash
npm i
npm run dev
```

This will start server at http://localhost:3000.

See **package.json** for an exhaustive list of commands.

## Docker Commands

Build container image

```bash
# build image w/ local config
docker build -f docker/local.dockerfile -t my-nextjs-project .

# build image w/ dev config
docker build -f docker/dev.dockerfile -t my-nextjs-project .

# build image w/ prod config
docker build -f docker/prod.dockerfile -t my-nextjs-project .
```

Run container image

```bash
docker run --name=my-nextjs-project --rm -p 4000:3000 my-nextjs-project
```

Now you should be able to access via http://localhost:4000

SSH into container

```bash
docker exec -it my-nextjs-project /bin/zsh
```

## Todo

- [x] Install zsh + powerlevel10k theme
  - For pretty terminal when ssh-ing to container
- [x] Split configs for dev / prod environments
- [x] Wire up webpack bundle analyzer
