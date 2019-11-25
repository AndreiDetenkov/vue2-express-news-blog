#!/usr/bin/env bash

DIR="$(pwd)"

#echo "Current dir is: ${DIR}"

cd ${DIR}/app
yarn install
pm2 start "yarn serve" --name news-app

cd ${DIR}/api
yarn install
pm2 start "yarn dev" --name news-api

