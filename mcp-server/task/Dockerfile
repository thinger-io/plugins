FROM node:22-alpine AS frontend

# install angular cli globally
RUN npm install -g @angular/cli@18.2.3

# app directory
WORKDIR /app

# copy package definitions
COPY ./frontend/package*.json ./

# install dependencies
RUN npm install

# bundle app source
COPY ./frontend/. .

# build app
RUN ng build --configuration=production

FROM node:22-alpine AS backend

# app directory
WORKDIR /app

# copy package definitions
COPY ./backend/package*.json ./

# install dependencies
RUN npm install

# bundle app source
COPY ./backend/tsconfig.json ./
COPY ./backend/src/ ./src/

RUN npm run build

# copy static resources (examples)
COPY ./backend/src/mcp_capabilities/resources \
     ./dist/mcp_capabilities/resources

FROM node:22-alpine AS production

# app directory
WORKDIR /app

COPY --from=backend /app/dist/ /app/package*.json /app/
COPY --from=frontend /app/dist/frontend /app/public
COPY ./backend/.env.production ./

RUN ls  -l

# change owner of app directory
RUN chown -R node /app

USER node

RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
