FROM plexinc/pms-docker

WORKDIR /usr/lib/plexffmpeg
COPY bin/ /

RUN \
# Replace the transcoder
    cp -f /usr/lib/plexffmpeg/Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder