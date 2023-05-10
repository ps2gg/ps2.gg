#!/bin/sh
yarn --cwd /app nx build census --prod
node /app/dist/services/census/main.js