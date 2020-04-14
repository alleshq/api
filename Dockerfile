FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm build
COPY . .
CMD npm start
