---
to: <%= name %>/tsconfig.json
---
{
  "compilerOptions": {
    "outDir": "dist",
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": true,
    "resolveJsonModule": true,
    "declaration": true,
    "allowJs": true,
    "lib": [
      "es2020"
    ]
  },
  "include": [
    "./src"
  ],
  "exclude": [
    "./dist"
  ]
}