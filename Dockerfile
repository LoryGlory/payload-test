FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /home/node/app

COPY ./package*.json ./

COPY . .

RUN yarn install

RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV MONGODB_URI=xxx
ENV PAYLOAD_SECRET=xxx
ENV PAYLOAD_PUBLIC_SERVER_URL=xxx
ENV NEXT_PUBLIC_SERVER_URL=xxx
ENV PAYLOAD_SEED=false
ENV PAYLOAD_DROP_DATABASE=false
ENV GCS_BUCKET=xxx
ENV BUCKET_URL=https://storage.googleapis.com/xxx/

WORKDIR /home/node/app

COPY package*.json ./
COPY .env ./

RUN yarn install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/.next ./.next
COPY --from=builder /home/node/app/build ./build

EXPOSE 8080

CMD ["node", "dist/server.js"]
