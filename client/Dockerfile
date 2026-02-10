# 빌드
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
# RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build # 램 1기가짜리 애저 vm에 올릴때는 가상램 만들고 이거까지 있어야함

# 실행
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]