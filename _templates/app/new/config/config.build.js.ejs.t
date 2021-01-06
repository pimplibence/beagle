---
to: <%= name %>/config/config.build.js
---
module.exports = {
    app: "<%= name %>",
    entry: "./src/application.js",
    environment: "./config/env",
};
