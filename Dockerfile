FROM mhart/alpine-node:10 as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
COPY lib /usr/src/lib	
RUN yarn 
COPY . .
RUN ls
RUN yarn build

FROM mhart/alpine-node:base-10
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
CMD ["node", "./build/server.js"]