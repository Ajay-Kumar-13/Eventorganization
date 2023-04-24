FROM node

WORKDIR /app

COPY package.json .

RUN npm install -g npm@9.5.1

RUN npm install --force

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]