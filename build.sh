if [ -z ${1+x} ]; then
  echo "Please pass the environment name to this script [dev|prod|staging]"
  exit 1
fi

# Update git
git pull
git submodule update --recursive --remote --init

# Remove previous builds
rm -rf dist

# Build services
if [ "$1" = 'dev' ]; then
  bun install
else
  bun install
  for dir in ./services/*/; do
    bun nx build $(basename "$dir") --prod
  done
fi

# Create private image registry on our swarm
echo "Setting up private docker registry..."
docker service create -d \
  --name registry \
  -p 5000:5000 \
  --mount type=volume,source=registry,destination=/var/lib/registry,volume-driver=local \
  registry:latest &2> /dev/null

# Build to local registry
docker build . \
  -t "127.0.0.1:5000/ps2gg:$1" \
  -f "docker/Dockerfile.$1"
docker push "127.0.0.1:5000/ps2gg:$1"
