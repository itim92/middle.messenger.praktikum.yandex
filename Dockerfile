FROM node:17.4

WORKDIR /app
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]
