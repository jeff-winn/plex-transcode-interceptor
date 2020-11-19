FROM plexinc/pms-docker:latest as base

RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install nodejs -y

WORKDIR /usr/src/plextranscodeinterceptor

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src src

RUN npm install

# DEBUG -----------------------------------------------------------------------
FROM base as debug

EXPOSE 9229

COPY ./scripts scripts
RUN npm run build

RUN \
# Replace the transcoder
    cp -f -p ./scripts/debug.sh /usr/lib/plexmediaserver/Plex\ Transcoder

# PROD -----------------------------------------------------------------------
FROM base as prod

RUN npm run build-prod
RUN npm run pkg

RUN \
# Replace the transcoder
    cp -f ./bin/Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder