#!/bin/sh
if [ -z ${1+x} ]; then
  echo "Please pass the service name to this script"
  exit 1
fi

# Ignore the output due to common "no schema change" errors that
# don't do anything, but distract the developer
yarn nx run $1:typeorm-migration --name $1_dev >/dev/null 2>&1
yarn nx run $1:typeorm schema:sync

yarn nx serve $1
