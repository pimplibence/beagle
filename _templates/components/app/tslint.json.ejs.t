---
to: <%= name %>/tslint.json
---
{
  "defaultSeverity": "error",
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "extends": [
    "tslint-config-airbnb"
  ],
  "rules": {
    "max-line-length": [
      true,
      240
    ],
    "prefer-array-literal": false,
    "no-implicit-dependencies": false,
    "object-literal-sort-keys": false,
    "no-submodule-imports": false,
    "no-var-requires": false,
    "no-console": false,
    "object-literal-shorthand": false,
    "interface-name": false,
    "ter-arrow-parens": false,
    "no-increment-decrement": false,
    "trailing-comma": false,
    "align": false,
    "indent": [
      true,
      "spaces",
      4
    ],
    "ter-indent": [
      true,
      4,
      {
        "SwitchCase": 1
      }
    ]
  }
}
