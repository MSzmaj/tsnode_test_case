FROM node:17 AS build
RUN npm install typescript -g
USER node
RUN mkdir -p /home/node
WORKDIR /home/node/api
COPY --chown=node:node . .

RUN npm install

FROM build AS development
RUN npm install -S express
RUN npm install @types/express
RUN npm install
CMD ["npm", "run", "start"]

FROM node:17
EXPOSE 4000
COPY --from=build /home/node/api /server
CMD ["/server"]