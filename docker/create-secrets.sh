#!/bin/bash
apt-get install pwgen

echo ''
echo 'Generating secrets...'
echo ''

# Sets up secrets for production services
for dir in ../services/*/; do
  pass=$(pwgen -s 64 1)
  service=$(basename "$dir")
  existing=$(docker secret ls | grep "${service}-db-pass" | wc -l)

  if [ $existing -gt 0 ]; then
    echo "${service}-db-pass already exists"
    continue
  fi
  
  printf "${pass}" | docker secret create "${service}-db-pass" -
  printf "${service}-db: ${pass} \n" >> secrets.txt
done

pass=$(pwgen -s 64 1)
printf "${pass}" | docker secret create rabbitmq-pass -
printf "rabbitmq: ${pass} \n" >> secrets.txt
