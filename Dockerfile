# DOCKER-VERSION 0.9
FROM dannycoates/node:0.10.29

RUN apt-get -y install libgmp3-dev

ADD . /app
WORKDIR /app

RUN npm install
RUN node scripts/gen_keys.js

VOLUME /config

ENV CONFIG_FILES /config/fxa_auth_server.json

EXPOSE 9000
CMD ["node", "bin/server.js"]
