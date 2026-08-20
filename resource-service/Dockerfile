FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install bcrypt
EXPOSE 5002
CMD ["node", "src/server.js"]
