# 빌드
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build

# 실행
FROM node:24-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

RUN mkdir -p /app/images && chown node:node /app/images

USER node

EXPOSE 3000

CMD ["npm", "start"]