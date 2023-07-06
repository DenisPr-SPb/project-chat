FROM node

WORKDIR /app

COPY package.json ./

RUN npm install -g npm@9.7.2

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]