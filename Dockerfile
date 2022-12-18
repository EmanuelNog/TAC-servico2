FROM node:19.1.0

COPY . .

RUN npm install

EXPOSE 3003
CMD [ "node", "src/index.js" ]

