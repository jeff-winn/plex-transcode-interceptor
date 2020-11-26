#!/bin/sh
echo "$@"
node /usr/src/plex-transcode-interceptor/build/main.js "$@"
