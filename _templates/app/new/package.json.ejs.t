---
to: <%= name %>/package.json
sh: cd <%= name %> && yarn install
---
{
  "version": "0.0.1",
  "description": "",
  "main": "src/index.ts",
  "license": "MIT",
  "author": "Bence Pimpli <pimplibence@gmail.com>",
  "dependencies": {
    "@kifly/beagle": "^0.4.4",
    "@kifly/boxer": "^0.3.2",
    "@sentry/node": "^5.27.4",
    "typescript": "^4.1.2"
  },
  "devDependencies": {
    "tslint": "^6.1.2",
    "tslint-config-airbnb": "^5.11.2"
  },
  "scripts": {
    "start": "./node_modules/@kifly/beagle/bin/bin.js start --config config/config.js",
    "script": "./node_modules/@kifly/beagle/bin/bin.js script --config config/config.js --mode script",
    "lint": "./node_modules/tslint/bin/tslint -c tslint.json './src/**/*.ts'",
    "build": "./node_modules/typescript/bin/tsc -p ./tsconfig.json"
  }
}
