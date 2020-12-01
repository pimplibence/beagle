---
to: <%= name %>/config.js
---
module.exports = {
    app: "<%= Name %>",
    entry: "./src/application.ts",
    language: "typescript",
    environment: "./env.json",
    typescript: {
        tsconfig: "./tsconfig.json"
    }
};
