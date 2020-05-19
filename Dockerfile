FROM plexinc/pms-docker

COPY bin/ /

RUN \
# Replace the transcoder
    cp -f /Plex\ Transcoder-linux /usr/lib/plexmediaserver/Plex\ Transcoder