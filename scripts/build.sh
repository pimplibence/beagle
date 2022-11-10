#!/bin/bash

# Lint
yarn lint

# Remove build artifact
rm -rf ./build

# Build project
./node_modules/typescript/bin/tsc -p tsconfig.json

# Fix packages.json
# - in future, this line should be removed and moved into tsconfig.json includes
cp ./package.json ./build/package.json
