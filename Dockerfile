FROM node:15.2.1-alpine3.10

RUN mkdir -p /usr/src
WORKDIR /usr/src

RUN apk update && apk upgrade
RUN apk add git

RUN git clone https://github.com/entmike/hubitat-datacollector.git

WORKDIR /usr/src/hubitat-datacollector
RUN npm i
CMD ["npm","start"]
