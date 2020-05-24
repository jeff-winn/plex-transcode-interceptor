FROM plexinc/pms-docker:latest

WORKDIR /usr/src/plexffmpeg

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
RUN npm run build-prod
RUN npm run pkg

RUN \
# Replace the transcoder
    cp -f ./Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder