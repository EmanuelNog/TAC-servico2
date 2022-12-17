FROM node:19.1.0

COPY . .

RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]

