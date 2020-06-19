# NextJS-Docker-Base-Template

A base template that will include several common tools and frameworks in a single docker container

#### Frameworks Included

- React (v16)
- [Next.js](https://nextjs.org/docs/)
- [Redux](https://www.valentinog.com/blog/redux/)
- [Material UI](https://material-ui.com/)
- [Typescript](https://medium.com/@wittydeveloper/typescript-learn-the-basics-2f56eb9b02eb)

#### Local Development

```bash
npm i
npm run dev
```

This will start server at http://localhost:3002.

See **package.json** for an exhaustive list of commands.

#### Docker Commands

Build container image

```bash
docker build -t my-next-project .
```

Run container image

```bash
docker run --name=my-next-project --rm -p 4000:3000 my-next-project
```

Now you should be able to access via http://localhost:4000

#### Todo

- [ ] Install zsh + powerlevel10k theme
  - For pretty terminal when ssh-ing to container
