FROM node:14.4.0-alpine3.12
ARG BUILD_VERSION
RUN apk update \
  && apk add ca-certificates wget \
  && update-ca-certificates
RUN sh -c "$(wget -O- https://raw.githubusercontent.com/deluan/zsh-in-docker/master/zsh-in-docker.sh)" -- \
    -p git \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
# If you are building your code for production
RUN npm install --only=production
# RUN npm rebuild node-sass
ENV CONFIG_ENV=prod
ENV BUILD_VERSION=${BUILD_VERSION}
RUN npm run build
CMD ["npm", "run", "start:prod"]
# CMD npm rebuild node-sass && npm run start:dev
