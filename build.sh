clear

if [ -z ${1+x} ]; then
  echo "Please pass the environment name to this script [dev|prod]"
  exit 1
fi

# Init submodules
git submodule update --recursive --remote --init

# Remove previous builds
rm -rf dist

# node_modules
if [ "$1" = 'dev' ]; then
  yarn
else
  yarn
  yarn nx build peepo --prod
  yarn nx build census --prod
  yarn nx build nasons --prod
  yarn nx build speedruns --prod
  yarn nx build notifications --prod
  yarn nx build subscriptions --prod
  yarn nx build users --prod
fi

clear

# Create private image registry on our swarm
echo "Setting up private docker registry..."
docker service create -d \
  --name registry \
  -p 5000:5000 \
  --mount type=volume,source=registry,destination=/var/lib/registry,volume-driver=local \
  registry:latest

# Build to local registry
docker build . \
  -t "127.0.0.1:5000/ps2gg:$1" \
  -f "docker/Dockerfile.$1"
docker push "127.0.0.1:5000/ps2gg:$1"
