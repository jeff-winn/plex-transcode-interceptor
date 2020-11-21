#!/bin/sh
echo "$@"
node --inspect-brk=0.0.0.0:9229 /usr/src/plex-transcode-interceptor/build/main.js "$@"
