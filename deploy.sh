clear

if [ -z ${1+x} ]; then
  echo "Please pass the environment name to this script (dev/prod)"
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

docker-compose \
  -f "docker/compose/base/docker-compose.base.yml" \
  -f "docker/compose/base/docker-compose.$1.yml" \
  -f "docker/compose/generated/docker-compose.$1.yml" \
  -f "docker/compose/override/docker-compose.$1.yml" \
  config >"docker/compose/out/docker-compose.$1.yml"

# Deploy
docker stack deploy \
  --prune \
  --compose-file "docker/compose/out/docker-compose.$1.yml" \
  "ps2gg"

echo "🙏 dev garanty no ban you too the circle of paffdaddy 🙏"

# $2 is optional service to log
if [ -z ${2+x} ]; then
  docker service logs ps2gg_census -f --tail 50 | sed 's/^[^ ]*  *| //'
else
  docker service logs ps2gg_$2 -f --tail 50 | sed 's/^[^ ]*  *| //'
fi
