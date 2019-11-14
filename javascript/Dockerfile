FROM node:10

WORKDIR /app

COPY ./package*.json /app/
RUN npm install
COPY ./tsconfig.json /app
COPY ./src/ /app/src/
COPY ./public /app/public/
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "prod"]
