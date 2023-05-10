clear

if [ -z ${1+x} ]; then
  echo "Please pass the environment name to this script (dev/prod)"
  exit 1
fi

# Custom overlay network to connect new and legacy stack
echo "Setting up overlay network"
docker network create --driver overlay --attachable ps2gg_internal
docker network create --driver overlay --attachable ps2gg_external

# Cleanup
echo "Cleaning up unused containers..."
docker rm $(docker ps -a -q)
clear

# Generate config
docker-compose \
  -f "docker/compose/docker-compose.base.yml" \
  -f "docker/compose/docker-compose.$1.yml" \
  config >"docker/compose/out/docker-compose.$1.out.yml"

# Deploy
docker stack deploy \
  --prune \
  --compose-file "docker/compose/out/docker-compose.$1.out.yml" \
  "ps2gg"

echo "🙏 dev garanty no ban you too the circle of paffdaddy 🙏"

# $2 is optional service to log
if [ -z ${2+x} ]; then
  docker service logs ps2gg_census -f --tail 50 | sed 's/^[^ ]*  *| //'
else
  docker service logs ps2gg_$2 -f --tail 50 | sed 's/^[^ ]*  *| //'
fi
