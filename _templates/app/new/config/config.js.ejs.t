---
to: <%= name %>/config/config.js
---
module.exports = {
    app: "<%= name %>",
    entry: "./src/application.ts",
    environment: "./config/env",
    useTsNode: true
};
