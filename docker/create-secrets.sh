#!/bin/bash
apt-get install pwgen

echo ''
echo 'Generating secrets...'
echo ''

# Sets up secrets for production services
for dir in ../services/*/; do
  pass=$(pwgen -s 64 1)
  service=$(basename "$dir")
  printf "${pass}" | docker secret create ${service}_db_pass -
  printf "${service}_db: ${pass} \n" >> secrets.txt
done

pass=$(pwgen -s 64 1)
printf "${pass}" | docker secret create rabbitmq_pass -
printf "rabbitmq: ${pass} \n" >> secrets.txt
