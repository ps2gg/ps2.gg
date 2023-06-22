#!/bin/bash
if [ -z ${1+x} ]; then
  echo "Please pass the environment name to this script [dev|prod|staging]"
  exit 1
fi

# Custom overlay network to connect new and legacy stack
echo "Setting up overlay network"
docker network create --driver overlay --attachable ps2gg-internal
docker network create --driver overlay --attachable ps2gg-external

# Cleanup
echo "Cleaning up unused containers..."
docker rm $(docker ps -a -q)

# Generate config
cd docker/compose
bun generate.ts
cd ../../

# Generate secrets
if [ "$1" == "prod" ] || [ "$1" == "staging" ]; then
  bash docker/create-secrets.sh
fi

docker-compose \
 -f "docker/compose/base/docker-compose.base.yml" \
 -f "docker/compose/base/docker-compose.$1.yml" \
 -f "docker/compose/generated/docker-compose.$1.yml" \
 -f "docker/compose/override/docker-compose.$1.yml" \
 config >"docker/compose/out/docker-compose.$1.yml"

# Bandaid fix for docker-compose v2 incorrectly adding
# redundant property at start of generated output
out="docker/compose/out/docker-compose.$1.yml"
tail -n +2 "$out" > "$out.tmp" && mv "$out.tmp" "$out"


# Bandaid fix for incorrect compose v2 bind mount settings
sed -i -e 's/bind://g' "$out"
sed -i -e 's/create_host_path: true//g' "$out"


# Bandaid fix for "published must be a integer"
sed -i '/published:/ s/"//g' "$out"

# Bandaid fix for missing version number
echo 'version: "3.4"' | cat - "$out" > temp && mv temp "$out"

# Bandaid fix for "Additional property name is not allowed"
sed -i '/name:/d' "$out"

# Deploy
docker stack deploy \
  --prune \
  --compose-file "docker/compose/out/docker-compose.$1.yml" \
  "ps2gg_${1}"

echo "🙏 dev garanty no ban you too the circle of paffdaddy 🙏"