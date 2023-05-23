#!/bin/bash
apt-get install pwgen

echo ''
echo 'Generating secrets...'
echo ''

# Sets up secrets for production services
for dir in ../services/*/; do
  pass=$(pwgen -s 64 1)
  service=$(basename "$dir")
  printf "${pass}" | docker secret create ${service}-db-pass -
  printf "${service}-db: ${pass} \n" >> secrets.txt
done

pass=$(pwgen -s 64 1)
printf "${pass}" | docker secret create rabbitmq-pass -
printf "rabbitmq: ${pass} \n" >> secrets.txt
