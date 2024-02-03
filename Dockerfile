FROM node:latest

RUN mkdir -p /starcoex/nestjs-backend
COPY ./package.json /starcoex/nestjs-backend
COPY ./package-lock.json /starcoex/nestjs-backend
WORKDIR /starcoex/nestjs-backend
RUN npm install
RUN npx prisma generate

COPY . /starcoex/nestjs-backend

CMD npm run start:dev