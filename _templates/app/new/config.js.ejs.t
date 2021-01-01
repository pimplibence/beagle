---
to: <%= name %>/config.js
---
module.exports = {
    app: "<%= Name %>",
    entry: "./src/application.ts",
    language: "typescript",
    environment: "./env.js",
    typescript: {
        tsconfig: "./tsconfig.json"
    }
};
