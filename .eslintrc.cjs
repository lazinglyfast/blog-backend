module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest/globals": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
  ],
  "overrides": [
    {
      "env": {
        "node": true,
        "jest": true,
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["jest"],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    // "comma-dangle": ["error", "always"],
  }
}
