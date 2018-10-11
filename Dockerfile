FROM node:8.12

ARG WEBHOOK_TOKEN
ENV WEBHOOK_TOKEN=$WEBHOOK_TOKEN

COPY . .

RUN npm install

EXPORT 80

CMD ["node", "webhook.js"]
