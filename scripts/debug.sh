#!/bin/sh
echo "$@"
node --inspect-brk=0.0.0.0:9229 /usr/src/plextranscodeinterceptor/build/main.js "$@"
