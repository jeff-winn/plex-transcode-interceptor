FROM plexinc/pms-docker:latest

WORKDIR /usr/src/plexffmpeg

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src src

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install nodejs -y

RUN npm install
RUN npm run build-prod
RUN npm run pkg

RUN \
# Replace the transcoder
    cp -f ./bin/Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder