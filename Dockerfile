FROM node:18.16

COPY ./package.json /starcoex/nestjs-backend
COPY ./package-lock.json /starcoex/nestjs-backend
COPY prisma /starcoex/nestjs-backend/prisma/
WORKDIR /starcoex/nestjs-backend
RUN npm install
RUN npx prisma generate

COPY . /starcoex/nestjs-backend

CMD npm run start:dev