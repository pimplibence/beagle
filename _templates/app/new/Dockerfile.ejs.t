---
to: <%= name %>/Dockerfile
---
## This is the currently supported LTS (2020, end of sept)
FROM node:14.14.0-alpine3.12

WORKDIR /var/www

# Add source files
ADD . .
ADD config/config.build.js.ejs.t config/config.js.ejs.t

# Build
RUN yarn install --frozen-lockfile --prod
RUN yarn build
