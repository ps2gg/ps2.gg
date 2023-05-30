#!/bin/sh
if [ -z ${1+x} ]; then
  echo "Please pass the service name to this script"
  exit 1
fi

~/.bun/bin/bun nx run "$1:typeorm-migration" --name "$1"
~/.bun/bin/bun nx run "$1:typeorm" schema:sync

node "/app/dist/services/$1/main.js" --production
