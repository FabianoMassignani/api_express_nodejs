FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

RUN npm rebuild bcrypt --build-from-source

ENV MONGO_URI="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
ENV MONGO_URI_TEST="mongodb+srv://fabiano:fabiano@app.4x3lw9q.mongodb.net/?retryWrites=true&w=majority&appName=app"
ENV PORT=3001
ENV JWT_SECRET="mysecretkey"
ENV JWT_EXPIRATION="1d"
ENV NODE_ENV="prod"

EXPOSE 3001

CMD ["npm", "run", "prod"]


