module.exports = {
  extends: ["airbnb-base", "prettier"],
  plugins: [],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "import/prefer-default-export": ["off"],
    "prefer-object-spread": ["off"],
    "no-plusplus": ["off"],
    "arrow-body-style": ["off"],
    "new-cap": ["off"],
    "no-console": ["off"],
  },
  env: {
    es2021: true,
    node: true,
  },
};
