FROM node:14.4.0-alpine3.12
ARG BUILD_VERSION
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
# If you are building your code for production
RUN npm install --only=production
# RUN npm rebuild node-sass
# ENV SOLD_ENV=dev
ENV BUILD_VERSION=${BUILD_VERSION}
RUN npm run build
CMD ["npm", "run", "start"]
# CMD npm rebuild node-sass && npm run start:dev
