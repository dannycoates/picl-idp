# DOCKER-VERSION 0.9
FROM dannycoates/base

RUN apt-get update -y
RUN apt-get -y install libgmp3-dev
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD docker/confd /etc/confd
ADD docker/run.sh /etc/service/fxa_auth_server/run

ADD . /app
WORKDIR /app

RUN npm install
RUN node scripts/gen_keys.js

EXPOSE 9000
