module.exports = {
  env: {
    node: true,
    es2020: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': 0,
  },
};
