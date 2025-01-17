FROM node:lts-alpine AS base

WORKDIR /home/ec2-play

COPY package* .

FROM base AS builder

RUN npm ci

COPY . .

RUN npm run build

FROM base AS prod-dependencies

RUN npm install --production

FROM base AS production

RUN addgroup --system --gid 1001 ec2-user && \
  adduser --system --uid 1001 ec2-user

COPY --from=prod-dependencies --chown=ec2-user:ec2-user /home/ec2-play/node_modules ./node_modules
COPY --from=builder --chown=ec2-user:ec2-user /home/ec2-play/lib ./lib

EXPOSE 8848

CMD [ "node", "lib/index.js" ]
