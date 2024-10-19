FROM node:lts-alpine3.19 AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build && npm prune --production

FROM node:lts-alpine3.19 AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY --from=development --chown=node:node /usr/src/app/package*.json ./
COPY --from=development --chown=node:node /usr/src/app/node_modules/ ./node_modules/
COPY --from=development --chown=node:node /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
