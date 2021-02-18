# Sold.com Take Home Project

This project includes several common tools and frameworks for developing a modern-day full-stack node/react web application.

The goal of this project is to gauge your fullstack capabilities and knowledge in the following areas:

- React
- Typescript
- Coding Patterns / Component Organization
- Existing NextJS knowledge, if any, or ability to learn it quickly
- Existing NestJS knowledge, if any, or ability to learn it quickly
- Existing Cypress knowledge, if any, or ability to learn it quickly

## Summary

This take home project includes frameworks that utilize the best practices for modern-day SPA (Single Page Applications) enforcing techniques such as _**code splitting, SSR (server-side rendering), material design, modular styles, state management, typing with typescript, prettier linting, unit testing, and more**_.

As a React developer, you should be able to dive in and start writing components!
_(don't worry about setting up config =])_

**Happy Coding!!!**

## Frameworks Included

### Major Dependencies worth mentioning

- [React (v16)](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/)
- [NestJS](https://nestjs.com/)
- [Cypress.io](https://www.cypress.io/)
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

To get started, you will need to first install the following:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker-Compose](https://docs.docker.com/compose/)
- [NodeJS](https://nodejs.org/en/)

Docker will let us run things in an isolated container environment.

Install dependencies

```bash
npm install
```

Start local server

```bash
npm start
```

This command will start up docker containers for the following services (may take a few minutes):

- NextJS node application to serve our front-end react components
- NestJS node application to serve as our back-end api docs and endpoints
- MongoDB database with a users collection

Once the services are ready, you will be able to access them locally:

Our NextJS application will be running on [http://localhost:4000](http://localhost:4000)

Our NestJS application will be running at [http://localhost:9001/api/users/](http://localhost:9001/api/users/)

Our MongoDB can be accessed at localhost:27018

#### Whats set up so far

##### Database

So far I've seeded a test user with the following credentials:

```ts
  {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@sold.com',
    password: 'test1234',
    phoneNumber: '+16195555555',
  }
```

##### Backend

For our backend api, I've set up basic CRUD rest api endpoints that handle the following:

- Create a new user
- Fetch all users
- Fetch user by id
- Update a user by id
- Delete a user by id
- Search users

(Swagger documentation is included at [http://localhost:9001/api/users/](http://localhost:9001/api/users/))

##### Frontend

In our frontend application, I've set up the following pages:

- [http://localhost:4000/login](http://localhost:4000/login) page
  - Should render simple email/password login
- [http://localhost:4000/dashboard](http://localhost:4000/dashboard) page (only accessible after logging in)
  - Should render a table with random static data
- [http://localhost:4000/sign-up](http://localhost:4000/sign-up) page
  - **This is what you will be building =)... So exciting!!!**

##### Automation Testing

For our automation testing, I've installed and configured [Cypress](https://www.cypress.io/).

I've included a simple login spec that contains 2 tests:

- Checks that invalid credentials will render error
- Valid credentials should redirect to dashboard page

## Your Task(s)

Before we begin, let me pause here so you can take a breath before your brain explodes.

- 1...
- 2...
- 3...

Okay ready? Here we go!

There are 3 core areas we are testing:

- Frontend React Skills
- Backend Rest API Skills
- Automation Testing Skills

It's okay if you are not well-versed in all 3 areas yet, just focus on what you're best at.

I'm fully aware that most candidates that I've reached out to, if any, will have experience with all of these tools and frameworks, so I'm not expecting anyone to be perfect.

With that said, there is plenty of documentation that can be found online, and these frameworks are quite popular and at the forefront of modern javascript development, so you will encounter these sooner or later.

Also, this test is set up to be very practical and to demonstrate what a real project could look like on our team.

Without further ado, here are the specs ~

##### Requirements

- Finish the sign up page (FE)
  - You will want to create a react form that follows the [Users API](http://localhost:9001/api/users/#/) for creating a new user
  - Validation is welcome
- Update search users endpoint (BE)
  - Currently the search endpoint does a strict search
  - We want to be able to have a more flexible search (ie. case insensitive, partial emails, names, etc...)
- Automation test for registering a new user

#### Note\*

For this project, Cypress isn't configured to run on docker, so you will need to install it on your local host machine's node_modules.

If you haven't already, cd into your project folder and run

```
npm install
```
