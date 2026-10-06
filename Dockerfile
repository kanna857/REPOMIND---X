FROM node:20-alpine AS base

WORKDIR /app

COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/ai/package.json ./packages/ai/
COPY packages/agents/package.json ./packages/agents/
COPY packages/github/package.json ./packages/github/
COPY packages/database/package.json ./packages/database/

RUN cd apps/web && npm install

COPY . .

WORKDIR /app/apps/web
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
