FROM plexinc/pms-docker:latest

WORKDIR /usr/src/plexffmpeg

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src src

RUN sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN sudo apt install nodejs

RUN npm install
RUN npm run build-prod
RUN npm run pkg

RUN \
# Replace the transcoder
    cp -f ./Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder