#!/bin/bash

yarn lint

rm -rf ./build

./node_modules/typescript/bin/tsc -p ./tsconfig.json

cp ./package.json ./build
cp -R ./generators ./build
cp -R ./docs ./build
cp -R ./bin ./build
