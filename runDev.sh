#!/usr/bin/env bash

DIR="$(pwd)"

#echo "Current dir is: ${DIR}"

cd ${DIR}/api
yarn install
pm2 start "yarn dev" --name news-api

#cd ${DIR}/app
#yarn install
#pm2 start "yarn dev" --name news-app
