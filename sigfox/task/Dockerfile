FROM node:lts-alpine3.14

# app directory
WORKDIR /usr/src/app

# copy package definitions
COPY package*.json ./

# install dependencies
RUN npm install

# bundle app source
COPY . .

EXPOSE 3000
CMD ["npm", "start"]