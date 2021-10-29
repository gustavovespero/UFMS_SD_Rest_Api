FROM node

WORKDIR /usr/api

COPY package.json /usr/api

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","src/server.js"] 